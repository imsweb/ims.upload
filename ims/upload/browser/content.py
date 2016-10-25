import plone.api
from Products.Five import BrowserView
from ims.upload.tools import printable_size


class ChunkView(BrowserView):
    """ Chunk view """


class ChunkedFileView(BrowserView):
    def chunksize(self):
        return plone.api.portal.get_registry_record(
            'ims.upload.interfaces.IChunkSettings.chunksize')

    def printable_size(self, fsize):
        return printable_size(fsize)

    def currsize(self):
        return '%s of %s' % (self.printable_size(self.context.currsize()),
                             self.context.targetsize and self.printable_size(int(self.context.targetsize) or '0 B'))
