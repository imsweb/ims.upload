import json, mimetypes, os
from Acquisition import aq_inner
from five import grok
import os
import plone.api
from plone.app.content.browser.folderfactories import _allowedTypes
from plone.namedfile.file import NamedBlobFile
from plone.registry.interfaces import IRegistry
from Products.CMFCore.utils import getToolByName
from Products.Five import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from Products.statusmessages.interfaces import IStatusMessage
from tempfile import NamedTemporaryFile
from zope.component import getAllUtilitiesRegisteredFor, getUtility, getMultiAdapter

from ims.upload import _, QUIET
from ims.upload.tools import _printable_size
from ims.upload.interfaces import IChunkSettings, IFileMutator, IUploadCapable, IChunkedFile

import logging
logger = logging.getLogger('ims.upload')

grok.templatedir('.')

import re
bad_id=re.compile(r'[^a-zA-Z0-9-_~,.$\(\)# @]').search
def clean_file_name(file_name):
  while bad_id(file_name):
    file_name = file_name.replace( bad_id(file_name).group(), u'_')
  return file_name

class ChunkUploadView(grok.View):
    """ Upload form page """
    grok.name('upload')
    grok.context(IUploadCapable)
    grok.template('upload')
    listing = ViewPageTemplateFile("listing.pt")

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

def mergeChunks(context, cf, file_name):
    chunks = sorted(cf.objectValues(),key=lambda term: term.startbyte)
    tmpfile = NamedTemporaryFile(mode='w',delete='false')
    tname = tmpfile.name
    tmpfile.close()
    counter = 1

    for chunk in chunks:
      if not QUIET:
        logger.info('Merging chunk %d' % counter)
      counter += 1
      tmpfile = open(tname,'a')
      tmpfile.write(chunk.file.data)
      tmpfile.close()
    tmpfile = open(tname,'r')
    if not QUIET:
      logger.info('Merging complete, writing to disk')

    if file_name not in context.objectIds():
      ctr = getToolByName(context, 'content_type_registry')
      pt = getToolByName(context, 'portal_types')
      content_type = ctr.findTypeName(file_name.lower(), '', '') or 'File'
      if content_type == 'Document' or not pt.getTypeInfo(context).allowType(content_type): # force file
        content_type = 'File'
      kwargs = {'title':file_name,
                'file':tmpfile}
      context.invokeFactory(content_type,file_name,**kwargs)
    nf = context[file_name]
    nf.setFilename(file_name)
    tmpfile.close()
    os.remove(tname)
    _file_name = file_name+'_chunk'
    context.manage_delObjects([_file_name])
    if not QUIET:
      logger.info('Upload complete')
    return nf.absolute_url()

class ChunkedUpload(grok.View):
    """ Upload a file
    """
    grok.name('upload-chunk')
    grok.context(IUploadCapable)

    def __init__(self, context, request):
        self.context = context
        self.request = request

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
        if file_name not in self.context.objectIds():
          ctr = getToolByName(self.context, 'content_type_registry')
          pt = getToolByName(self.context, 'portal_types')
          content_type = ctr.findTypeName(file_name.lower(), '', '') or 'File'
          if content_type == 'Document' or not pt.getTypeInfo(self.context).allowType(content_type): # force file
            content_type = 'File'
          kwargs = {'title':file_name,
                    'file':file_data}
          self.context.invokeFactory(content_type,file_name,**kwargs)
        nf = self.context[file_name]
        nf.setFilename(file_name)
        _files[file_name] = {'name':file_name,
                             'size':nf.size(),
                             'url':nf.absolute_url()}

      return json.dumps({'files':_files.values()})

class ChunkCheck(grok.View):
    """ Checks the chunk from the folder view """
    grok.name('chunk-check')
    grok.context(IUploadCapable)

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def render(self):
      file_name = clean_file_name(self.request.form['file'])
      data = {'uploadedBytes':0}
      if file_name + '_chunk' in self.context.objectIds():
        data['uploadedBytes'] = self.context[file_name + '_chunk'].currsize()
        data['url'] = self.context[file_name + '_chunk'].absolute_url()
      return json.dumps(data)

class ChunkCheckDirect(grok.View):
    """ Returns the uploaded bytes and expected total, from the chunked file """
    grok.name('chunk-check')
    grok.context(IChunkedFile)

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def render(self):
      data = {'uploadedBytes':self.context.currsize(),
              'targetsize':self.context.targetsize}
      return json.dumps(data)

class ChunkedUploadDirect(grok.View):
    """ Upload a file chunk
    """
    grok.name('upload-chunk')
    grok.context(IChunkedFile)

    def __init__(self, context, request):
        self.context = context
        self.request = request

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

class ChunklessUploadView(grok.View):
    """ Backup upload for no javascript, etc. """
    grok.name('chunkless-upload')
    grok.context(IUploadCapable)

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
        self.context.invokeFactory('File',file_name)
        ob = self.context[file_name]
        ob.setFile(_file)
        ob.setFilename(file_name)
        ob.reindexObject()

        IStatusMessage(self.request).addStatusMessage(_(u"File successfully uploaded."),"info")
        return self.request.response.redirect(self.context.absolute_url()+'/@@upload')

class UnchunkedListing(grok.View):
    """ listing of all else
    """
    grok.name('unchunk-listing')
    grok.context(IUploadCapable)

    def content_actions(self):
      context = aq_inner(self.context)
      portal_actions = getToolByName(context, 'portal_actions')
      button_actions = portal_actions.listActionInfos(object=aq_inner(self.context), categories=('folder_buttons', ))
      return button_actions

    def render(self):
      template = ViewPageTemplateFile("listing.pt")
      return template(self)

    def member_info(self, creator):
      return self.context.portal_membership.getMemberInfo(creator)


class ChunkedListing(grok.View):
    """ listing of files
    """
    grok.name('chunk-listing')
    grok.context(IUploadCapable)

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

class ChunkedFileDelete(grok.View):
    """ Special delete, with redirect """
    grok.name('delete')
    grok.context(IChunkedFile)

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

    def is_upload_supported(self):
      guards = [plone.api.user.has_permission('Add portal content'),
                plone.api.user.has_permission('Archetypes: Add file'),
                self.context.restrictedTraverse('@@plone').displayContentsTab(),
                [i for i in _allowedTypes(self.request,self.context) if i.id in ('Image','File')]]
      for guard in guards:
        if not guard:
          return False
      return True