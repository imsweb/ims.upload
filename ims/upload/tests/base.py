import unittest

import transaction
from ims.entrez.tests.base import IntegrationTestCase as EntrezIntegrationTestCase
from plone.app.testing import SITE_OWNER_NAME, SITE_OWNER_PASSWORD
from plone.testing.zope import Browser
from zope.interface.declarations import directlyProvides

from .. import testing
from ..interfaces import IUploadLayer


class UnitTestCase(unittest.TestCase):
    def setUp(self):
        pass


class IntegrationTestCase(EntrezIntegrationTestCase):
    layer = testing.INTEGRATION

    def setUp(self):
        super(IntegrationTestCase, self).setUp()
        directlyProvides(self.portal.REQUEST, IUploadLayer)
        directlyProvides(self.request, IUploadLayer)


class FunctionalTestCase(IntegrationTestCase):
    layer = testing.FUNCTIONAL

    def setUp(self):
        super(FunctionalTestCase, self).setUp()
        self.browser = Browser(self.layer['app'])
        self.browser.handleErrors = False
        self.browser.addHeader(
            'Authorization',
            'Basic %s:%s' % (SITE_OWNER_NAME, SITE_OWNER_PASSWORD,)
        )
        transaction.commit()
