from plone.app.content.browser.folderfactories import FolderFactoriesView

class UploadFolderFactoriesView(FolderFactoriesView):
  """ Replaces the link for Add File dropdown with a link to our upload page """
  def addable_types(self, include=None):
    addables = super(UploadFolderFactoriesView,self).addable_types(include)
    file_add = [a for a in addables if a['id'] == 'File']
    if file_add:
      file_add = file_add[0]
      file_add['action'] = '%s/@@upload' % self.add_context().absolute_url()
    return addables