from plone.app.blob.interfaces import IATBlob, IATBlobImage
from plone.rfc822.interfaces import IPrimaryField
from Products.CMFCore.interfaces import ISiteRoot
from Products.CMFCore.utils import getToolByName
from zope.interface import Interface

class ITransformIndexable(Interface):
    """ Adapter interface for having a transform to be indexable """
    def can_transform(self):
        pass

class TransformIndexable(object):
    """ Get the primary field and check for a path to transform to text/plain """
    def __init__(self, context):
        self.context = context

    def can_transform(self):
        transforms = getToolByName(self, 'portal_transforms')
        field = None
        try:
          field = IPrimaryField(self.context) # dexterity
        except TypeError:
          if hasattr(self.context,'getPrimaryField'): # archetypes
            field = self.context.getPrimaryField()

        if not field:
          return False
        source = field.getContentType(self.context)
        mimetype = 'text/plain'
        return bool(transforms._findPath(source, mimetype))