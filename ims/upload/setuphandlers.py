import plone.api
from Products.GenericSetup.tool import UNKNOWN


def setup_various(context):
    """ Miscellaneous steps import handle
    """

    setup = plone.api.portal.get_tool('portal_setup')
    pw = plone.api.portal.get_tool('portal_workflow')
    if setup.getLastVersionForProfile('CRNTracker:default') != UNKNOWN:
        # redo the workflow step to allow in CRNTracker
        setup.runImportStepFromProfile(
            'profile-Products.CRNTracker:default', 'workflow')
        pw.updateRoleMappings()
    elif setup.getLastVersionForProfile('ims.groupspace:default') != UNKNOWN:
        # redo the workflow step to allow in GroupSpaces
        setup.runImportStepFromProfile(
            'profile-ims.groupspace:default', 'workflow')
        pw.updateRoleMappings()
