from five import grok
from plone.dexterity.content import Item, Container
from plone.directives.dexterity import DisplayForm
from plone.namedfile.file import NamedBlobFile
from Products.CMFPlone.utils import safe_unicode as su
import re

import logging
logger = logging.getLogger('ims.upload')

from interfaces import IChunkedFile, IChunk

grok.templatedir('browser')

class ChunkedFile(Container):
    """ A chunked file. Allows it to have its own workflows and schema before conversion to File
        Stores multiple chunks
    """

    def currsize(self):
        return sum([c.file.getSize() for c in self.objectValues()])
   
    def addChunk(self,file_data,file_name,content_range):
        id = content_range.replace(' ','_').replace('/',' of ') or file_name # just use file name if only one chunk
        self.invokeFactory('Chunk',id)
        chunk = self[id]
        chunk.file = NamedBlobFile(file_data.read(),filename = su(file_name))
        if content_range: # might be a lone chunk
          startbyte,endbyte = re.match('bytes ([0-9]+)-([0-9]+)',content_range).groups()
          chunk.startbyte = int(startbyte)
          chunk.endbyte = int(endbyte)
        logger.info('Chunk uploaded: %s; %s' % (content_range,file_name))

class ChunkedFileView(DisplayForm):
    grok.context(IChunkedFile)
    grok.name('chunkedfile-view')
    grok.template('chunkedfile-view')


class Chunk(Item):
    """ An individual chunk """

class ChunkView(DisplayForm):
    grok.context(IChunk)
    grok.name('chunk-view')
    grok.template('chunk-view')