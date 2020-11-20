import json
import logging
import mimetypes
import re
import tempfile

import plone.api as api
from Products.CMFPlone import utils
from Products.CMFPlone.interfaces.constrains import ISelectableConstrainTypes
from Products.CMFPlone.resources import add_bundle_on_request, add_resource_on_request
from Products.CMFPlone.utils import human_readable_size
from Products.Five import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.content.browser.folderfactories import _allowedTypes
from plone.app.content.interfaces import IStructureAction
from plone.app.contenttypes.browser.folder import FolderView
from plone.rfc822.interfaces import IPrimaryFieldInfo
from zope.component import getAllUtilitiesRegisteredFor, getUtilitiesFor, getMultiAdapter
from zope.event import notify
from zope.lifecycleevent import ObjectModifiedEvent

from .. import _, QUIET_UPLOAD
from ..interfaces import IFileMutator
from ..tools import printable_size

logger = logging.getLogger('ims.upload')

bad_id = re.compile(r'[^a-zA-Z0-9-_~,.$\(\)# @]').search


def clean_file_name(file_name):
    while bad_id(file_name):
        file_name = file_name.replace(bad_id(file_name).group(), '_')
    non_underscore = re.search(r'[^_]', file_name)
    if non_underscore:
        return file_name[non_underscore.start():]
    raise Exception('invalid file name')


class ChunkUploadView(BrowserView):
    """ Upload form page """
    listing = ViewPageTemplateFile("listing.pt")

    def __call__(self):
        add_resource_on_request(self.request, 'upload-bootstrap')
        add_bundle_on_request(self.request, 'jqueryui')
        add_resource_on_request(self.request, 'jquery-fileupload')
        add_resource_on_request(self.request, 'ims-upload-js')
        return super().__call__(self)

    def email_from_address(self):
        return api.portal.get_registry_record('plone.email_from_address')

    def contents_table(self):
        return self.listing()

    def chunked_files(self):
        """ Get full objects because
            1) we would otherwise have to index currsize and targetsize
            2) we are not likely to have many ChunkedFiles anyway
        """
        chunked = []
        for obj in self.context.objectValues('ChunkedFile'):
            chunked.append({'url': obj.absolute_url(),
                            'size': printable_size(obj.targetsize),
                            'percent': '%.02f%%' % (obj.currsize() / float(obj.targetsize) * 100),
                            'title': obj.Title(),
                            'date': obj.CreationDate(),
                            'portal_type': obj.portal_type,
                            })
        return chunked

    def chunksize(self):
        return api.portal.get_registry_record('ims.upload.interfaces.IChunkSettings.chunksize')

    def can_delete(self):
        return api.user.has_permission('Manage delete objects', obj=self.context)


def make_file(file_name, context, filedata):
    if file_name not in context.objectIds():
        ctr = api.portal.get_tool('content_type_registry')
        pt = api.portal.get_tool('portal_types')
        content_type = ctr.findTypeName(file_name.lower(), '', '') or 'File'
        # force file
        if content_type == 'Document' or not pt.getTypeInfo(context).allowType(content_type):
            content_type = 'File'
        obj = api.content.create(container=context, type=content_type, id=file_name, title=file_name)
        primary_field = IPrimaryFieldInfo(obj)
        setattr(obj, primary_field.fieldname, primary_field.field._type(
            filedata, filename=utils.safe_unicode(file_name)))
        notify(ObjectModifiedEvent(obj))
    return context[file_name]


def merge_chunks(context, cf, file_name):
    chunks = sorted(cf.objectValues(), key=lambda term: term.startbyte)

    nf = make_file(file_name, context, filedata='')
    primary_field = IPrimaryFieldInfo(nf)
    tf = tempfile.NamedTemporaryFile(mode='wb', delete=False)
    temp_name = tf.name
    for chunk in chunks:
        tf.write(chunk.file.data)
    tf.close()

    # See plone.namedfile.file.NamedBlobFile and NamedImageFile. _setData will find a storable and store the blob
    # We want a closed file, which will let it select FileDescriptorStorable in _setData. This storable passes the file
    # location to blob.consumeFile which will convert it to blob form. See https://squishlist.com/ims/plone/68427
    with open(temp_name, 'rb') as closed_file:
        pass
    primary_field.value._setData(closed_file)
    nf.reindexObject()

    _file_name = file_name + '_chunk'
    context.manage_delObjects([_file_name])
    if not QUIET_UPLOAD:
        logger.info('Upload complete')
    return nf.absolute_url()


class ChunkedUpload(BrowserView):
    """ Upload a file
    """

    def render(self):
        _files = {}
        file_data = self.request.form['files[]']
        file_name = file_data.filename
        file_name = file_name.split('/')[-1].split('\\')[-1]  # bug in old IE
        file_name = clean_file_name(file_name)
        _file_name = file_name + '_chunk'
        logger.info('Staring chunk: ' + _file_name)

        content_range = self.request['HTTP_CONTENT_RANGE']

        content_type = mimetypes.guess_type(file_name)[0] or ""
        for mutator in getAllUtilitiesRegisteredFor(IFileMutator):
            file_name, file_data, content_type = mutator(
                file_name, file_data, content_type)

        if content_range:
            """ don't do anything special if we only have one chunk """
            max_size = int(content_range.split('/')[-1])

            if file_data:
                if _file_name in self.context.objectIds():
                    cf = self.context[_file_name]
                    cf.add_chunk(file_data, file_name,
                                 content_range, graceful=True)
                else:
                    self.context.invokeFactory('ChunkedFile', _file_name)
                    cf = self.context[_file_name]
                    cf.title = file_name
                    cf.add_chunk(file_data, file_name, content_range)

                size = cf.currsize()
                url = cf.absolute_url()
                _files[file_name] = {'name': file_name,
                                     'size': size,
                                     'url': url}

                if size == max_size:
                    if not QUIET_UPLOAD:
                        logger.info('Starting chunk merger')
                    nf_url = merge_chunks(self.context, cf, file_name)
                    _files[file_name]['url'] = nf_url
        else:
            nf = make_file(file_name, self.context, file_data)
            primary_field = IPrimaryFieldInfo(nf)
            _files[file_name] = {'name': file_name,
                                 'size': human_readable_size(primary_field.value.size),
                                 'url': nf.absolute_url()}

        self.request.response.setHeader('Content-Type', 'application/json')
        return json.dumps({'files': list(_files.values())})


class ChunkCheck(BrowserView):
    """ Checks the chunk from the folder view """

    def render(self):
        file_name = clean_file_name(self.request.form['file'])
        data = {'uploadedBytes': 0}
        if file_name + '_chunk' in self.context.objectIds():
            data['uploadedBytes'] = self.context[
                file_name + '_chunk'].currsize()
            data['url'] = self.context[file_name + '_chunk'].absolute_url()
        self.request.response.setHeader('Content-Type', 'application/json')
        return json.dumps(data)


class ChunkCheckDirect(BrowserView):
    """ Returns the uploaded bytes and expected total, from the chunked file """

    def render(self):
        data = {'uploadedBytes': self.context.currsize(),
                'targetsize': self.context.targetsize}
        self.request.response.setHeader('Content-Type', 'application/json')
        return json.dumps(data)


class ChunkedUploadDirect(BrowserView):
    """ Upload a file chunk
    """

    def render(self):
        _files = {}
        file_data = self.request.form['files[]']
        file_name = file_data.filename
        file_name = file_name.split('/')[-1].split('\\')[-1]  # bug in old IE
        file_name = clean_file_name(file_name)

        content_range = self.request['HTTP_CONTENT_RANGE']

        content_type = mimetypes.guess_type(file_name)[0] or ""
        for mutator in getAllUtilitiesRegisteredFor(IFileMutator):
            file_name, file_data, content_type = mutator(
                file_name, file_data, content_type)

        complete = False
        if content_range:
            """ don't do anything special if we only have one chunk """
            max_size = int(content_range.split('/')[-1])

            if file_data:
                self.context.add_chunk(
                    file_data, file_name, content_range, graceful=True)

                size = self.context.currsize()
                url = self.context.absolute_url()
                _files[file_name] = {'name': file_name,
                                     'size': size,
                                     'url': url}

                if size == max_size:
                    if not QUIET_UPLOAD:
                        logger.info('Starting chunk merger')
                    merge_chunks(self.context.aq_parent, self.context, file_name)
                    complete = self.context.aq_parent.absolute_url() + '/@@upload'
        self.request.response.setHeader('Content-Type', 'application/json')
        return json.dumps({'files': list(_files.values()), 'complete': complete})


class ChunklessUploadView(BrowserView):
    """ Backup upload for no javascript, etc. """

    def render(self):
        _file = self.request.form.get('files[]')
        if not _file:
            api.portal.show_message(
                _("You must select a file."), self.request, type="error")
            return self.request.response.redirect(self.context.absolute_url() + '/@@upload')

        # older IE returns full path?!
        file_name = _file.filename.split('\\')[-1]
        file_name = clean_file_name(file_name)
        if file_name in self.context.objectIds():
            api.portal.show_message(
                _("A file with that name already exists"), self.request, type="errors")
            return self.request.response.redirect(self.context.absolute_url() + '/@@upload')
        else:
            make_file(file_name, self.context, _file)
            api.portal.show_message(
                _("File successfully uploaded."), self.request, type="info")
            return self.request.response.redirect(self.context.absolute_url() + '/@@upload')


class UnchunkedListing(FolderView):
    """ listing of all else
    """

    def content_actions(self):
        actions = []
        for name, Utility in getUtilitiesFor(IStructureAction):
            utility = Utility(self.context, self.request)
            actions.append(utility)
        actions.sort(key=lambda action: action.order)
        return [a.get_options() for a in actions]

    def member_info(self, creator):
        return self.context.portal_membership.getMemberInfo(creator)

    def batch(self):
        """ Don't batch. Because this is an AJAX call, all of the batch tool links would need to be AJAXed too """
        return self.results(batch=False)


class ChunkedListing(BrowserView):
    """ listing of files
    """

    def render(self):
        content = []
        for obj in self.context.objectValues():
            currsize = getattr(obj, 'currsize', 0)
            if callable(currsize):
                currsize = currsize()
                content.append({'url': obj.absolute_url(),
                                'size': printable_size(getattr(obj, 'targetsize', 0)),
                                'percent': '%.02f%%' % (currsize / float(getattr(obj, 'targetsize', 0)) * 100),
                                'title': obj.Title(),
                                'date': api.portal.get_localized_time(obj.CreationDate(), long_format=1),
                                'portal_type': obj.portal_type,
                                })
        self.request.response.setHeader('Content-Type', 'application/json')
        return json.dumps(content)


class ChunkedFileDelete(BrowserView):
    """ Special delete, with redirect """

    def render(self):
        parent = self.context.aq_inner.aq_parent
        parent.manage_delObjects(self.context.getId())
        api.portal.show_message(
            _("Partially uploaded file successfully deleted."), self.request, type="info")
        self.request.response.redirect(parent.absolute_url() + '/@@upload')


class UploadActionGuards(BrowserView):
    def __init__(self, context, request):
        super().__init__(context, request)
        request.response.setHeader('Cache-Control', 'no-cache')
        request.response.setHeader('Pragma', 'no-cache')

    @property
    def guards(self):
        immediately_addable = True
        context_state = getMultiAdapter(
            (self.context.aq_inner, self.request), name='plone_context_state')
        container = context_state.folder()
        try:
            constraint = ISelectableConstrainTypes(container)
            immediately_addable = 'File' in constraint.getImmediatelyAddableTypes()
        except TypeError:
            pass

        return [api.user.has_permission('Add portal content', obj=self.context),
                api.user.has_permission('plone.app.contenttypes: Add File', obj=self.context),
                immediately_addable,
                [i for i in _allowedTypes(self.request, self.context) if i.id in ('Image', 'File')]]

    def is_upload_supported(self):
        return all(self.guards)

    def is_upload_supported_details(self):
        return self.guards
