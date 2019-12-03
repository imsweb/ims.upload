import logging
from Products.GenericSetup.tool import UNKNOWN

import plone.api


def to_1_5(context, logger=None):
    if logger is None:
        logger = logging.getLogger('ims.upload')
    setup = plone.api.portal.get_tool('portal_setup')
    if setup.getLastVersionForProfile('ims.upload') != UNKNOWN:
        PROFILE_ID = 'profile-ims.upload:default'
        context.runImportStepFromProfile(PROFILE_ID, 'actions')
        logger.info("Updated upload action")
