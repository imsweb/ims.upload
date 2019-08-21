import plone.api
from Products.CMFPlone.resources import add_bundle_on_request, add_resource_on_request
from Products.Five import BrowserView

from ..tools import printable_size


class ChunkView(BrowserView):
    """ Chunk view """


class ChunkedFileView(BrowserView):

    def __call__(self):
        add_resource_on_request(self.request, 'upload-bootstrap')
        add_bundle_on_request(self.request, 'jqueryui')
        add_resource_on_request(self.request, 'jquery-fileupload')
        return super(ChunkedFileView, self).__call__(self)

    def can_see_chunks(self):
        return plone.api.user.has_permission('Manage portal', obj=self.context)

    def chunksize(self):
        return plone.api.portal.get_registry_record(
            'ims.upload.interfaces.IChunkSettings.chunksize')

    def printable_size(self, fsize):
        return printable_size(fsize)

    def currsize(self):
        return '%s of %s' % (self.printable_size(self.context.currsize()),
                             self.context.targetsize and self.printable_size(int(self.context.targetsize) or '0 B'))
