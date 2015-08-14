from plone.app.content.browser.folderfactories import FolderFactoriesView

class UploadFolderFactoriesView(FolderFactoriesView):
  """ Replaces the link for Add File dropdown with a link to our upload page """
  def addable_types(self, include=None):
    addables = super(UploadFolderFactoriesView,self).addable_types(include)

    upload_types = ('File','Image')
    for upload_type in upload_types:
      upload_add = [a for a in addables if a['id'] == upload_type]
      if upload_add:
        upload_add = upload_add[0]
        upload_add['action'] = '%s/@@upload' % self.add_context().absolute_url()
      return addables