from plone.indexer import indexer
from zope.interface import Interface

from ims.upload.transformable import ITransformIndexable

@indexer(Interface)
def transformableIndexer(obj):
  adapter = ITransformIndexable(obj)
  return adapter.can_transform()