from five import grok
import math
from plone.dexterity.content import Item, Container
from plone.directives.dexterity import DisplayForm
from plone.namedfile.file import NamedBlobFile
from plone.registry.interfaces import IRegistry
from Products.CMFPlone.utils import safe_unicode as su
from zope.component import getAllUtilitiesRegisteredFor, getUtility
import re

import logging
logger = logging.getLogger('ims.upload')

from interfaces import IChunkedFile, IChunk, IChunkSettings

grok.templatedir('browser')

class ChunkedFile(Container):
    """ A chunked file. Allows it to have its own workflows and schema before conversion to File
        Stores multiple chunks
    """

    def currsize(self):
        """ Get the size up until the first missing chunk """
        chunks = sorted(self.objectValues(),key=lambda term: term.startbyte)
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        chunksize = registry.chunksize
          
        # check for missing chunks:
        counter = 0
        sum = 0
        for chunk in chunks:
          if chunk.startbyte != counter:
            return counter
          counter += chunksize
          sum += chunk.file.getSize()
        return sum
   
    def addChunk(self,file_data,file_name,content_range,graceful=False):
        if not self.targetsize:
          self.targetsize = content_range.split('/')[-1]
        elif self.targetsize != content_range.split('/')[-1]:
          # incoming file size does not match expected total size. abort!
          return False
        id = content_range.replace(' ','_').replace('/',' of ') or file_name # just use file name if only one chunk
        if id in self.objectIds() and graceful:
          logger.info('Chunk already exists: %s; assume file resume' % file_name)
          return
        self.invokeFactory('Chunk',id)
        chunk = self[id]
        chunk.file = NamedBlobFile(file_data.read(),filename = su(file_name))
        if content_range: # might be a lone chunk
          startbyte,endbyte = re.match('bytes ([0-9]+)-([0-9]+)',content_range).groups()
          chunk.startbyte = int(startbyte)
          chunk.endbyte = int(endbyte)
        logger.info('Chunk uploaded: %s; %s' % (content_range,file_name))
    
    def Title(self):
        return 'Processing/Aborted - ' + self.id[:-6] # remove _chunk from id

class ChunkedFileView(DisplayForm):
    grok.context(IChunkedFile)
    grok.name('chunkedfile-view')
    grok.template('chunkedfile-view')

    def chunksize(self):
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        return registry.chunksize
    
    def printable_size(self, fsize):
        if fsize == 0:
          return '0 B'
        prefixes = ['B','KB','MB','GB','TB','PB']
        tens = int(math.log(fsize,1024))
        fsize = round(fsize/math.pow(1024,tens),2)
        if tens < len(prefixes):
          return '%.2f %s' % (fsize,prefixes[tens])
        else: # uhhhh, we should never have a file this big
          return '%.2f %s' % (fsize * 1024 ** tens,'B')

    def currsize(self):
        return '%s of %s' % (self.printable_size(self.context.currsize()),self.context.targetsize and self.printable_size(int(self.context.targetsize) or '0 B'))

class Chunk(Item):
    """ An individual chunk """

class ChunkView(DisplayForm):
    grok.context(IChunk)
    grok.name('chunk-view')
    grok.template('chunk-view')