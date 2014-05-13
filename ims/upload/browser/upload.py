import json, mimetypes, os
from five import grok

from plone.namedfile.file import NamedBlobFile
from plone.registry.interfaces import IRegistry
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

    def chunksize(self):
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        return registry.chunksize

class ChunkUploadView2(ChunkUploadView):
    """ Basic Plus UI version """
    grok.name('upload2')
    grok.template('upload2')

    def jstemplate(self):
      """ have to put it here or TAL will fail to compile """
      return """
<script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
        <td>
            <span class="preview"></span>
        </td>
        <td>
            <p class="name">{%=file.name%}</p>
            <strong class="error text-danger"></strong>
        </td>
        <td>
            <p class="size">Processing...</p>
            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
        </td>
        <td>
            {% if (!i && !o.options.autoUpload) { %}
                <button class="btn btn-primary start" disabled>
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Start</span>
                </button>
            {% } %}
            {% if (!i) { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script><!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-download fade">
        <td>
            <span class="preview">
                {% if (file.thumbnailUrl) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
                {% } %}
            </span>
        </td>
        <td>
            <p class="name">
                {% if (file.url) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
                {% } else { %}
                    <span>{%=file.name%}</span>
                {% } %}
            </p>
            {% if (file.error) { %}
                <div><span class="label label-danger">Error</span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <span class="size">{%=o.formatFileSize(file.size)%}</span>
        </td>
        <td>
            {% if (file.deleteUrl) { %}
                <button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Delete</span>
                </button>
                <input type="checkbox" name="delete" value="1" class="toggle">
            {% } else { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>"""

#from memory_profiler import profile
#@profile
def mergeChunks(context, cf, file_name):
    chunks = sorted(cf.objectValues(),key=lambda term: term.startbyte)
    context.invokeFactory('File',file_name)
    nf = context[file_name]
    nf.setTitle(file_name)
    tmpfile = NamedTemporaryFile(mode='w',delete='false')
    tname = tmpfile.name
    tmpfile.close()

    for chunk in chunks:
      tmpfile = open(tname,'a')
      tmpfile.write(chunk.file.data)
      tmpfile.close()
    tmpfile = open(tname,'r')
    nf.setFile(tmpfile)
    nf.setFilename(file_name) # overwrite temp file name
    tmpfile.close()
    os.remove(tname)
    _file_name = file_name+'_'
    context.manage_delObjects([_file_name])
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
            nf_url = mergeChunks(self.context, cf, file_name)
            _files[file_name]['url'] = nf_url
      else:
        self.context.invokeFactory('File',file_name)
        nf = self.context[file_name]
        nf.setTitle(file_name)
        nf.setFile(file_data)
        nf.reindexObject()
        _files[file_name] = {'name':file_name,
                             'size':nf.size(),
                             'url':nf.absolute_url()}

      return json.dumps({'files':_files.values()})