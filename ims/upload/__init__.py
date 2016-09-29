from zope.i18nmessageid import MessageFactory
_ = MessageFactory('ims.upload')

QUIET = True # for printing log info
import os
UPLOAD_TMP_DIR = os.environ.get(UPLOAD_TMP_DIR) or None