import plone.api
from plone.rfc822.interfaces import IPrimaryFieldInfo
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
        try:
            transforms = plone.api.portal.get_tool('portal_transforms')
        except plone.api.exc.CannotGetPortalError:
            return False
        source = None
        try:
            field = IPrimaryFieldInfo(self.context)  # dexterity
            source = field.value.contentType
        except TypeError:
            if hasattr(self.context, 'getPrimaryField'):  # archetypes
                field = self.context.getPrimaryField()
                source = field.getContentType(self.context)

        if not source:
            return False

        mimetype = 'text/plain'
        if source == mimetype:
            return True
        return bool(transforms._findPath(source, mimetype))
