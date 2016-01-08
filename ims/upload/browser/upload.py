import json, mimetypes
from Acquisition import aq_inner
import plone.api
from plone.app.content.browser.file import TUS_ENABLED
from plone.app.content.browser.folderfactories import _allowedTypes
from plone.app.content.interfaces import IStructureAction
from plone.app.content.utils import json_dumps
from plone.registry.interfaces import IRegistry
from plone.rfc822.interfaces import IPrimaryFieldInfo
from plone.uuid.interfaces import IUUID
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone.interfaces.controlpanel import IMailSchema
from Products.CMFPlone import utils
from Products.Five import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.statusmessages.interfaces import IStatusMessage
from zope.component import getAllUtilitiesRegisteredFor, getUtility, getUtilitiesFor, getMultiAdapter
from zope.component.hooks import getSite
from zope.i18n import translate

from ims.upload import _, QUIET
from ims.upload.tools import _printable_size
from ims.upload.interfaces import IChunkSettings, IFileMutator, IUploadCapable, IChunkedFile

import logging
logger = logging.getLogger('ims.upload')

import re
bad_id=re.compile(r'[^a-zA-Z0-9-_~,.$\(\)# @]').search
def clean_file_name(file_name):
  while bad_id(file_name):
    file_name = su(file_name).replace( bad_id(su(file_name)).group(), u'_')
  non_underscore = re.search(r'[^_]', file_name)
  if non_underscore:
    return file_name[non_underscore.start():]
  raise Exception('invalid file name')

class ChunkUploadView(BrowserView):
    """ Upload form page """
    listing = ViewPageTemplateFile("listing.pt")

    def email_from_address(self):
      registry = getUtility(IRegistry)
      mail_settings = registry.forInterface(IMailSchema, prefix='plone')
      return mail_settings.email_from_address

    def contents_table(self,context='',request=''):
      if not context:
        context=self.context
      if not request:
        request=self.request

      return self.listing()

    def chunked_files(self):
      """ Get full objects because
          1) we would otherwise have to index currsize and targetsize
          2) we are not likely to have many ChunkedFiles anyway
      """
      chunked = []
      for obj in self.context.objectValues('ChunkedFile'):
          chunked.append({'url':obj.absolute_url(),
                          'size':_printable_size(obj.targetsize),
                          'percent':'%.02f%%' % (obj.currsize()/float(obj.targetsize)*100),
                          'title':obj.Title(),
                          'date':obj.CreationDate(),
                          'portal_type':obj.portal_type,
                        })
      return chunked

    def chunksize(self):
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        return registry.chunksize

    def can_delete(self):
      mtool = getToolByName(self.context,'portal_membership')
      return mtool.checkPermission('Manage delete objects',self.context)

def make_file(file_name, context, filedata):
  if file_name not in context.objectIds():
      ctr = getToolByName(context, 'content_type_registry')
      pt = getToolByName(context, 'portal_types')
      content_type = ctr.findTypeName(file_name.lower(), '', '') or 'File'
      if content_type == 'Document' or not pt.getTypeInfo(context).allowType(content_type): # force file
        content_type = 'File'
      obj = plone.api.content.create(container=context, type=content_type, id=file_name, title=file_name)
      primary_field = IPrimaryFieldInfo(obj)
      setattr(obj, primary_field.fieldname, primary_field.field._type(filedata, filename=utils.safe_unicode(file_name)))
      obj.reindexObject()
  return context[file_name]

def mergeChunks(context, cf, file_name):
    chunks = sorted(cf.objectValues(),key=lambda term: term.startbyte)
    counter = 1

    nf = make_file(file_name, context, filedata='')
    primary_field = IPrimaryFieldInfo(nf)

    data = None
    primary_field.value._setData(''.join([chunk.file.data for chunk in chunks]))
    nf.reindexObject()

    _file_name = file_name+'_chunk'
    context.manage_delObjects([_file_name])
    if not QUIET:
      logger.info('Upload complete')
    return nf.absolute_url()

class ChunkedUpload(BrowserView):
    """ Upload a file
    """

    def render(self):
      _files = {}
      file_data = self.request.form['files[]']
      file_name = file_data.filename
      file_name = file_name.split('/')[-1].split('\\')[-1] # bug in old IE
      file_name = clean_file_name(file_name)
      _file_name = file_name+'_chunk'

      chunk_size = self.request['CONTENT_LENGTH']
      content_range = self.request['HTTP_CONTENT_RANGE']

      content_type = mimetypes.guess_type(file_name)[0] or ""
      for mutator in getAllUtilitiesRegisteredFor(IFileMutator):
          file_name, file_data, content_type = mutator(file_name, file_data, content_type)

      if content_range:
        """ don't do anything special if we only have one chunk """
        max_size = int(content_range.split('/')[-1])

        if file_data:
          if _file_name in self.context.objectIds():
            cf = self.context[_file_name]
            cf.addChunk(file_data,file_name,content_range,graceful=True)
          else:
            self.context.invokeFactory('ChunkedFile',_file_name)
            cf = self.context[_file_name]
            cf.title = file_name
            cf.addChunk(file_data,file_name,content_range)

          size = cf.currsize()
          url = cf.absolute_url()
          _files[file_name]= {'name':file_name,
                              'size':size,
                              'url':url}

          if size == max_size :
            if not QUIET:
              logger.info('Starting chunk merger')
            nf_url = mergeChunks(self.context, cf, file_name)
            _files[file_name]['url'] = nf_url
      else:
        nf = make_file(file_name, self.context, file_data)
        primary_field = IPrimaryFieldInfo(nf)
        _files[file_name] = {'name':file_name,
                             'size':nf.getObjSize(None,primary_field.value.getSize()),
                             'url':nf.absolute_url()}

      return json.dumps({'files':_files.values()})

class ChunkCheck(BrowserView):
    """ Checks the chunk from the folder view """
    def render(self):
      file_name = clean_file_name(self.request.form['file'])
      data = {'uploadedBytes':0}
      if file_name + '_chunk' in self.context.objectIds():
        data['uploadedBytes'] = self.context[file_name + '_chunk'].currsize()
        data['url'] = self.context[file_name + '_chunk'].absolute_url()
      return json.dumps(data)

class ChunkCheckDirect(BrowserView):
    """ Returns the uploaded bytes and expected total, from the chunked file """
    def render(self):
      data = {'uploadedBytes':self.context.currsize(),
              'targetsize':self.context.targetsize}
      return json.dumps(data)

class ChunkedUploadDirect(BrowserView):
    """ Upload a file chunk
    """

    def render(self):
      _files = {}
      file_data = self.request.form['files[]']
      file_name = file_data.filename
      file_name = file_name.split('/')[-1].split('\\')[-1] # bug in old IE
      file_name = clean_file_name(file_name)
      _file_name = file_name+'_chunk'

      chunk_size = self.request['CONTENT_LENGTH']
      content_range = self.request['HTTP_CONTENT_RANGE']

      content_type = mimetypes.guess_type(file_name)[0] or ""
      for mutator in getAllUtilitiesRegisteredFor(IFileMutator):
          file_name, file_data, content_type = mutator(file_name, file_data, content_type)

      complete = False
      if content_range:
        """ don't do anything special if we only have one chunk """
        max_size = int(content_range.split('/')[-1])

        if file_data:
          self.context.addChunk(file_data,file_name,content_range,graceful=True)

          size = self.context.currsize()
          url = self.context.absolute_url()
          _files[file_name]= {'name':file_name,
                              'size':size,
                              'url':url}

          if size == max_size :
            if not QUIET:
              logger.info('Starting chunk merger')
            nf_url = mergeChunks(self.context.aq_parent, self.context, file_name)
            complete = self.context.aq_parent.absolute_url() + '/@@upload'
      return json.dumps({'files':_files.values(),'complete':complete})

class ChunklessUploadView(BrowserView):
    """ Backup upload for no javascript, etc. """

    def render(self):
      _file = self.request.form.get('files[]')
      if not _file:
        IStatusMessage(self.request).addStatusMessage(_(u"You must select a file."),"error")
        return self.request.response.redirect(self.context.absolute_url()+'/@@upload')

      file_name = _file.filename.split('\\')[-1] # older IE returns full path?!
      file_name = clean_file_name(file_name)
      if file_name in self.context.objectIds():
        IStatusMessage(self.request).addStatusMessage(_(u"A file with that name already exists"),"error")
        return self.request.response.redirect(self.context.absolute_url()+'/@@upload')
      else:
        make_file(file_name, self.context, _file)

        IStatusMessage(self.request).addStatusMessage(_(u"File successfully uploaded."),"info")
        return self.request.response.redirect(self.context.absolute_url()+'/@@upload')

class UnchunkedListing(BrowserView):
    """ listing of all else
    """

    def content_actions(self):
      actions = []
      for name, Utility in getUtilitiesFor(IStructureAction):
          utility = Utility(self.context, self.request)
          actions.append(utility)
      actions.sort(key=lambda a: a.order)
      import pdb; pdb.set_trace()
      return [a.get_options() for a in actions] # if not a.get_options().get('form')]

    def member_info(self, creator):
      return self.context.portal_membership.getMemberInfo(creator)


class ChunkedListing(BrowserView):
    """ listing of files
    """

    def render(self):
      putils = getToolByName(self.context,'plone_utils')

      content = []
      for obj in self.context.objectValues():
        currsize = getattr(obj,'currsize',0)
        if callable(currsize):
          currsize = currsize()
          content.append({'url':obj.absolute_url(),
                          'size':_printable_size(getattr(obj,'targetsize',0)),
                          'percent':'%.02f%%' % (currsize/float(getattr(obj,'targetsize',0))*100),
                          'title':obj.Title(),
                          'date':putils.toLocalizedTime(obj.CreationDate(),long_format=1),
                          'portal_type':obj.portal_type,
                        })
      return json.dumps(content)

class ChunkedFileDelete(BrowserView):
    """ Special delete, with redirect """

    def render(self):
      parent = self.context.aq_inner.aq_parent
      parent.manage_delObjects(self.context.getId())
      IStatusMessage(self.request).addStatusMessage(_(u"Partially uploaded file successfully deleted."),"info")
      self.request.response.redirect(parent.absolute_url()+'/@@upload')


class UploadActionGuards(BrowserView):
    def __init__(self, context, request):
        super(BrowserView, self).__init__(context, request)
        request.response.setHeader('Cache-Control', 'no-cache')
        request.response.setHeader('Pragma', 'no-cache')

    @property
    def guards(self):
      return [plone.api.user.has_permission('Add portal content', obj=self.context),
              plone.api.user.has_permission('ATContentTypes: Add File', obj=self.context),
              [i for i in _allowedTypes(self.request,self.context) if i.id in ('Image','File')]]

    def is_upload_supported(self):
      for guard in self.guards:
        if not guard:
          return False
      return True

    def is_upload_supported_details(self):
      return self.guards