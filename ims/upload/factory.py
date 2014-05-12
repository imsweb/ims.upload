# -*- coding: utf-8 -*-
# taken from collective.uploadify

__author__ = 'Ramon Bartl <ramon.bartl@nexiles.de>'
__docformat__ = 'plaintext'

import transaction
from thread import allocate_lock

from zope import interface
from zope import component

from zope.event import notify
from zope.lifecycleevent import ObjectModifiedEvent
from zope.filerepresentation.interfaces import IFileFactory

# Since Plone4.3 INameChooser moved to zope.container
try:
    from zope.container.interfaces import INameChooser
except:
    from zope.app.container.interfaces import INameChooser

from plone.i18n.normalizer.interfaces import IFileNameNormalizer

from Products.Archetypes.event import ObjectInitializedEvent
from Products.CMFPlone import utils as ploneutils
from Products.CMFCore import utils as cmfutils

from interfaces import IUploadCapable

upload_lock = allocate_lock()


class UploadingCapableFileFactory(object):
    interface.implements(IFileFactory)
    component.adapts(IUploadCapable)

    def __init__(self, context):
        self.context = context

    def __call__(self, name, content_type, data):
        ctr = cmfutils.getToolByName(self.context, 'content_type_registry')
        type_ = ctr.findTypeName(name.lower(), '', '') or 'File'

        normalizer = component.getUtility(IFileNameNormalizer)
        chooser = INameChooser(self.context)

        upload_lock.acquire()

        newid = chooser.chooseName(normalizer.normalize(name), self.context.aq_parent)
        try:
            transaction.begin()
            obj = ploneutils._createObjectByType(type_, self.context, newid)
            mutator = obj.getPrimaryField().getMutator(obj)
            mutator(data, content_type=content_type)
            obj.setTitle(name)
            obj.reindexObject()

            notify(ObjectInitializedEvent(obj))
            notify(ObjectModifiedEvent(obj))

            transaction.commit()
        finally:
            upload_lock.release()
        return obj
