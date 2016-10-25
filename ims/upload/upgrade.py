import logging

import plone.api


def to_1_5(context, logger=None):
    if logger is None:
        logger = logging.getLogger('ims.upload')
    qi = plone.api.portal.get_tool('portal_quickinstaller')
    if qi.isProductInstalled('ims.upload'):
        PROFILE_ID = 'profile-ims.upload:default'
        context.runImportStepFromProfile(PROFILE_ID, 'actions')
        logger.info("Updated upload action")
