from Products.CMFPlone.utils import get_installer
from plone import api
from plone.app.testing import TEST_USER_ID
from plone.app.testing import setRoles
from plone.browserlayer import utils

from . import base
from .. import testing
from ..interfaces import IUploadLayer


class TestUninstall(base.IntegrationTestCase):
    layer = testing.INTEGRATION

    def setUp(self):
        self.portal = self.layer['portal']
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.installer = get_installer(self.portal)
        self.installer.uninstall_product('ims.upload')
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if ims.upload is cleanly uninstalled."""
        self.assertFalse(self.installer.is_product_installed('ims.upload'))

    def test_browserlayer_removed(self):
        """Test that IUploadLayer is removed."""
        self.assertNotIn(IUploadLayer, utils.registered_layers())
