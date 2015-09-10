from Products.CMFCore.utils import getToolByName

def setup_various(context):
  """Miscellanous steps import handle
  """

  portal = context.getSite()
  if context.readDataFile('imsupload.txt') is None:
        return

  qi = getToolByName(portal,'portal_quickinstaller')
  setup = getToolByName(portal,'portal_setup')
  pw = getToolByName(portal,'portal_workflow')
  if qi.isProductInstalled('CRNTracker'):
    # redo the workflow step to allow in GroupSpaces
    setup.runImportStepFromProfile('profile-Products.CRNTracker:default', 'workflow')
    pw.updateRoleMappings()
  elif qi.isProductInstalled('GroupSpace'):
    # redo the workflow step to allow in GroupSpaces
    setup.runImportStepFromProfile('profile-Products.GroupSpace:default', 'workflow')
    pw.updateRoleMappings()