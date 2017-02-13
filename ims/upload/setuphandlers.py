import plone.api


def setup_various(context):
    """Miscellanous steps import handle
    """

    if context.readDataFile('imsupload.txt') is None:
        return

    qi = plone.api.portal.get_tool('portal_quickinstaller')
    setup = plone.api.portal.get_tool('portal_setup')
    pw = plone.api.portal.get_tool('portal_workflow')
    if qi.isProductInstalled('CRNTracker'):
        # redo the workflow step to allow in CRNTracker
        setup.runImportStepFromProfile(
            'profile-Products.CRNTracker:default', 'workflow')
        pw.updateRoleMappings()
    elif qi.isProductInstalled('ims.groupspace'):
        # redo the workflow step to allow in GroupSpaces
        setup.runImportStepFromProfile(
            'profile-ims.groupspace:default', 'workflow')
        pw.updateRoleMappings()
    set_indexes()


def set_indexes():
    catalog = plone.api.portal.get_tool('portal_catalog')
    metadata_defs = ('transform_indexable',)

    for metadata in metadata_defs:
        if not metadata in catalog.schema():
            catalog.addColumn(metadata)
