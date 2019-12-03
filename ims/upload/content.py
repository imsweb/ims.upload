import logging
import re

from plone.dexterity.content import Item, Container
from plone.namedfile.file import NamedBlobFile
from plone.registry.interfaces import IRegistry
from zope.component import getUtility

logger = logging.getLogger('ims.upload')

from . import QUIET_UPLOAD
from .interfaces import IChunkSettings


class ChunkedFile(Container):
    """ A chunked file. Allows it to have its own workflows and schema before conversion to File
        Stores multiple chunks
    """
    meta_type = 'ChunkedFile'

    def currsize(self):
        """ Get the size up until the first missing chunk """
        chunks = sorted(self.objectValues(), key=lambda term: term.startbyte)
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

    def add_chunk(self, file_data, file_name, content_range, graceful=False):
        if not self.targetsize:
            self.targetsize = content_range.split('/')[-1]
        elif self.targetsize != content_range.split('/')[-1]:
            # incoming file size does not match expected total size. abort!
            return False
        id = content_range.replace(' ', '_').replace(
            '/', ' of ') or file_name  # just use file name if only one chunk
        if id in self.objectIds() and graceful:
            if not QUIET_UPLOAD:
                logger.info('Chunk already exists: %s; assume file resume' % file_name)
            return
        self.invokeFactory('Chunk', id)
        chunk = self[id]
        chunk.file = NamedBlobFile(file_data.read(), filename=file_name)
        if content_range:  # might be a lone chunk
            startbyte, endbyte = re.match(
                'bytes ([0-9]+)-([0-9]+)', content_range).groups()
            chunk.startbyte = int(startbyte)
            chunk.endbyte = int(endbyte)
            if not QUIET_UPLOAD:
                logger.info('Chunk uploaded: %s; %s' % (content_range, file_name))

    def Title(self):
        return 'Processing/Aborted - ' + self.id[:-6]  # remove "_chunk" from id


class Chunk(Item):
    """ An individual chunk """
