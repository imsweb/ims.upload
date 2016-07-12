from plone.indexer import indexer
from zope.interface import Interface

from ims.upload.transformable import ITransformIndexable


@indexer(Interface)
def transformableIndexer(obj):
    try:
        adapter = ITransformIndexable(obj)
    except TypeError:  # not transformable, ignore
        return
    return adapter.can_transform()
