from plone.registry.interfaces import IRegistry
from Products.Five import BrowserView
from zope.component import getUtility

from ims.upload.interfaces import IChunkSettings
from ims.upload.tools import _printable_size

class ChunkView(BrowserView):
    """ Chunk view """

class ChunkedFileView(BrowserView):

    def chunksize(self):
        registry = getUtility(IRegistry).forInterface(IChunkSettings)
        return registry.chunksize

    def printable_size(self, fsize):
      return _printable_size(fsize)

    def currsize(self):
        return '%s of %s' % (self.printable_size(self.context.currsize()),self.context.targetsize and self.printable_size(int(self.context.targetsize) or '0 B'))