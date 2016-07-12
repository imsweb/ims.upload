import plone.api
from plone.registry.interfaces import IRegistry
from plone.cachepurging.interfaces import ICachePurgingSettings
from Products.GenericSetup.registry import _import_step_registry
from zope.component import getUtility
import logging
import transaction


def to_1_5(context, logger=None):
    if logger is None:
        logger = logging.getLogger('ims.upload')
    qi = plone.api.portal.get_tool('portal_quickinstaller')
    if qi.isProductInstalled('ims.upload'):
        PROFILE_ID = 'profile-ims.upload:default'
        context.runImportStepFromProfile(PROFILE_ID, 'actions')
        logger.info("Updated upload action")
