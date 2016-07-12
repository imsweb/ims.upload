import plone.api

def setup_various(context):
    """Miscellanous steps import handle
    """

    portal = context.getSite()
    if context.readDataFile('imsupload.txt') is None:
        return

    qi = plone.api.portal.get_tool('portal_quickinstaller')
    setup = plone.api.portal.get_tool('portal_setup')
    pw = plone.api.portal.get_tool('portal_workflow')
    if qi.isProductInstalled('CRNTracker'):
        # redo the workflow step to allow in GroupSpaces
        setup.runImportStepFromProfile(
            'profile-Products.CRNTracker:default', 'workflow')
        pw.updateRoleMappings()
    elif qi.isProductInstalled('GroupSpace'):
        # redo the workflow step to allow in GroupSpaces
        setup.runImportStepFromProfile(
            'profile-Products.GroupSpace:default', 'workflow')
        pw.updateRoleMappings()
