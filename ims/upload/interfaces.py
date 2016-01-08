from plone.directives import form
from plone.namedfile.field import NamedBlobFile
from plone.theme.interfaces import IDefaultPloneLayer
from zope import interface, schema

from ims.upload import _

class IUploadLayer(IDefaultPloneLayer):
    """
    """

class IUploadCapable(interface.Interface):
    """ Marker interface for an upload capable content type (folder)
    """

class IFileMutator(interface.Interface):
    """
    """

class IChunkedFile(form.Schema):
  title = schema.TextLine(
      title = _(u'label_title', default=u'Title'),
      required = True
      )
  targetsize = schema.TextLine(title=_(u'Target size'))

class IChunk(form.Schema):
  title = schema.TextLine(
      title = _(u'label_title', default=u'Title'),
      required = True
      )
  file = NamedBlobFile(
        title=_(u"Chunked File"),
        required=False,
      )
  startbyte = schema.Int(title=_(u'Starting byte'),required=False)
  endbyte = schema.Int(title=_(u'Ending byte'),required=False)


class IChunkSettings(form.Schema):
  """ """
  chunksize = schema.Int(
                     title = _(u"Chunk size"),
                     description = _(u"Size of each chunk in upload"),
                     )
  hijack = schema.Bool(
                     title = _(u"Override 'Add New' menu"),
                     description = _(u"If true, adding Files and Images will instead redirect to @@upload"),
                     )