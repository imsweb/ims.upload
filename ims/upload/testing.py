from plone.app.testing import PloneSandboxLayer, IntegrationTesting, FunctionalTesting, applyProfile
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
import ims.upload
import collective.js.jqueryui


class UploadSiteLayer(PloneSandboxLayer):
    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configuration_context):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=collective.js.jqueryui)
        self.loadZCML(package=ims.upload)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'ims.upload:default')


UPLOAD_SITE_FIXTURE = UploadSiteLayer()

INTEGRATION = IntegrationTesting(
    bases=(UPLOAD_SITE_FIXTURE,),
    name="ims.upload"
)

FUNCTIONAL = FunctionalTesting(
    bases=(UPLOAD_SITE_FIXTURE,),
    name="ims.upload"
)
