import json, mimetypes, os
from five import grok

from plone.namedfile.file import NamedBlobFile
from plone.registry.interfaces import IRegistry
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from tempfile import NamedTemporaryFile
from zope.component import getAllUtilitiesRegisteredFor, getUtility
from zope.filerepresentation.interfaces import IFileFactory

from ims.upload.interfaces import IChunkSettings, IFileMutator, IUploadCapable

import logging
logger = logging.getLogger('ims.upload')
grok.templatedir('.')

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

    def chunksize(self):
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        return registry.chunksize

def mergeChunks(context, cf, file_name):
    chunks = sorted(cf.objectValues(),key=lambda term: term.startbyte)
    if file_name not in context.objectIds():
      context.invokeFactory('File',file_name)
    nf = context[file_name]
    nf.setTitle(file_name)
    tmpfile = NamedTemporaryFile(mode='w',delete='false')
    tname = tmpfile.name
    tmpfile.close()
    counter = 1

    for chunk in chunks:
      logger.info('Merging chunk %d' % counter)
      counter += 1
      tmpfile = open(tname,'a')
      tmpfile.write(chunk.file.data)
      tmpfile.close()
    tmpfile = open(tname,'r')
    logger.info('Merging complete, writing to disk')
    nf.setFile(tmpfile)
    nf.setFilename(file_name) # overwrite temp file name
    tmpfile.close()
    nf.reindexObject()
    os.remove(tname)
    _file_name = file_name+'_'
    context.manage_delObjects([_file_name])
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
      _file_name = file_name+'_'

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
            cf.addChunk(file_data,file_name,content_range)
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
            logger.info('Starting chunk merger')
            nf_url = mergeChunks(self.context, cf, file_name)
            _files[file_name]['url'] = nf_url
      else:
        if file_name not in self.context.objectIds():
          self.context.invokeFactory('File',file_name)
        nf = self.context[file_name]
        nf.setTitle(file_name)
        nf.setFile(file_data)
        nf.reindexObject()
        _files[file_name] = {'name':file_name,
                             'size':nf.size(),
                             'url':nf.absolute_url()}

      return json.dumps({'files':_files.values()})