from zope import schema

from plone.namedfile.field import NamedBlobFile
from plone.supermodel import model
from plone.theme.interfaces import IDefaultPloneLayer
from zope.interface import interface

from . import _


class IUploadLayer(IDefaultPloneLayer):
    """
    """


class IUploadCapable(interface.Interface):
    """ Marker interface for an upload capable content type (folder)
    """


class IFileMutator(interface.Interface):
    """
    """


class IChunkedFile(model.Schema):
    title = schema.TextLine(
        title=_('label_title', default='Title'),
        required=True
    )
    targetsize = schema.TextLine(title=_('Target size'))


class IChunk(model.Schema):
    title = schema.TextLine(
        title=_('label_title', default='Title'),
        required=True
    )
    file = NamedBlobFile(
        title=_("Chunked File"),
        required=False,
    )
    startbyte = schema.Int(title=_('Starting byte'), required=False)
    endbyte = schema.Int(title=_('Ending byte'), required=False)


class IChunkSettings(model.Schema):
    """ """
    chunksize = schema.Int(
        title=_("Chunk size"),
        description=_("Size of each chunk in upload"),
    )
    hijack = schema.Bool(
        title=_("Override 'Add New' menu"),
        description=_(
            "If true, adding Files and Images will instead redirect to @@upload"),
        required=False,
    )
