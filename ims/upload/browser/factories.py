import plone.api
from plone.app.content.browser.folderfactories import FolderFactoriesView

from ims.upload.interfaces import IChunkSettings


class UploadFolderFactoriesView(FolderFactoriesView):
    """ Replaces the link for Add File dropdown with a link to our upload page """

    def addable_types(self, include=None):
        addables = super(UploadFolderFactoriesView,
                         self).addable_types(include)
        hijack = plone.api.portal.get_registry_record(
            'ims.upload.interfaces.IChunkSettings.hijack')

        if hijack:
            upload_types = ('File', 'Image')
            for upload_type in upload_types:
                upload_add = [a for a in addables if a['id'] == upload_type]
                if upload_add:
                    upload_add = upload_add[0]
                    upload_add[
                        'action'] = '%s/@@upload' % self.add_context().absolute_url()
        return addables
