!function(e){"use strict";var t=function(e,i,a){var n,r,o=document.createElement("img");if(o.onerror=i,o.onload=function(){!r||a&&a.noRevoke||t.revokeObjectURL(r),i&&i(t.scale(o,a))},t.isInstanceOf("Blob",e)||t.isInstanceOf("File",e))n=r=t.createObjectURL(e),o._type=e.type;else{if("string"!=typeof e)return!1;n=e,a&&a.crossOrigin&&(o.crossOrigin=a.crossOrigin)}return n?(o.src=n,o):t.readFile(e,function(e){var t=e.target;t&&t.result?o.src=t.result:i&&i(e)})},i=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;t.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},t.transformCoordinates=function(){},t.getTransformedOptions=function(e){return e},t.renderImageToCanvas=function(e,t,i,a,n,r,o,s,d,l){return e.getContext("2d").drawImage(t,i,a,n,r,o,s,d,l),e},t.hasCanvasOption=function(e){return e.canvas||e.crop},t.scale=function(e,i){i=i||{};var a,n,r,o,s,d,l,c,u,g=document.createElement("canvas"),f=e.getContext||t.hasCanvasOption(i)&&g.getContext,h=e.naturalWidth||e.width,m=e.naturalHeight||e.height,p=h,S=m,b=function(){var e=Math.max((r||p)/p,(o||S)/S);e>1&&(p=Math.ceil(p*e),S=Math.ceil(S*e))},v=function(){var e=Math.min((a||p)/p,(n||S)/S);1>e&&(p=Math.ceil(p*e),S=Math.ceil(S*e))};return f&&(i=t.getTransformedOptions(i),l=i.left||0,c=i.top||0,i.sourceWidth?(s=i.sourceWidth,void 0!==i.right&&void 0===i.left&&(l=h-s-i.right)):s=h-l-(i.right||0),i.sourceHeight?(d=i.sourceHeight,void 0!==i.bottom&&void 0===i.top&&(c=m-d-i.bottom)):d=m-c-(i.bottom||0),p=s,S=d),a=i.maxWidth,n=i.maxHeight,r=i.minWidth,o=i.minHeight,f&&a&&n&&i.crop?(p=a,S=n,u=s/d-a/n,0>u?(d=n*s/a,void 0===i.top&&void 0===i.bottom&&(c=(m-d)/2)):u>0&&(s=a*d/n,void 0===i.left&&void 0===i.right&&(l=(h-s)/2))):((i.contain||i.cover)&&(r=a=a||r,o=n=n||o),i.cover?(v(),b()):(b(),v())),f?(g.width=p,g.height=S,t.transformCoordinates(g,i),t.renderImageToCanvas(g,e,l,c,s,d,0,0,p,S)):(e.width=p,e.height=S,e)},t.createObjectURL=function(e){return!!i&&i.createObjectURL(e)},t.revokeObjectURL=function(e){return!!i&&i.revokeObjectURL(e)},t.readFile=function(e,t,i){if(window.FileReader){var a=new FileReader;if(a.onload=a.onerror=t,i=i||"readAsDataURL",a[i])return a[i](e),a}return!1},"function"==typeof define&&define.amd?define(function(){return t}):e.loadImage=t}(this),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var t=e.renderImageToCanvas;e.detectSubsampling=function(e){var t,i;return e.width*e.height>1048576&&(t=document.createElement("canvas"),t.width=t.height=1,i=t.getContext("2d"),i.drawImage(e,-e.width+1,0),0===i.getImageData(0,0,1,1).data[3])},e.detectVerticalSquash=function(e,t){var i,a,n,r,o,s=e.naturalHeight||e.height,d=document.createElement("canvas"),l=d.getContext("2d");for(t&&(s/=2),d.width=1,d.height=s,l.drawImage(e,0,0),i=l.getImageData(0,0,1,s).data,a=0,n=s,r=s;r>a;)o=i[4*(r-1)+3],0===o?n=r:a=r,r=n+a>>1;return r/s||1},e.renderImageToCanvas=function(i,a,n,r,o,s,d,l,c,u){if("image/jpeg"===a._type){var g,f,h,m,p=i.getContext("2d"),S=document.createElement("canvas"),b=1024,v=S.getContext("2d");if(S.width=b,S.height=b,p.save(),g=e.detectSubsampling(a),g&&(n/=2,r/=2,o/=2,s/=2),f=e.detectVerticalSquash(a,g),g||1!==f){for(r*=f,c=Math.ceil(b*c/o),u=Math.ceil(b*u/s/f),l=0,m=0;s>m;){for(d=0,h=0;o>h;)v.clearRect(0,0,b,b),v.drawImage(a,n,r,o,s,-h,-m,o,s),p.drawImage(S,0,0,b,b,d,l,c,u),h+=b,d+=c;m+=b,l+=u}return p.restore(),i}}return t(i,a,n,r,o,s,d,l,c,u)}}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";var t=e.hasCanvasOption;e.hasCanvasOption=function(e){return t(e)||e.orientation},e.transformCoordinates=function(e,t){var i=e.getContext("2d"),a=e.width,n=e.height,r=t.orientation;if(r)switch(r>4&&(e.width=n,e.height=a),r){case 2:i.translate(a,0),i.scale(-1,1);break;case 3:i.translate(a,n),i.rotate(Math.PI);break;case 4:i.translate(0,n),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-n);break;case 7:i.rotate(.5*Math.PI),i.translate(a,-n),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-a,0)}},e.getTransformedOptions=function(e){if(!e.orientation||1===e.orientation)return e;var t,i={};for(t in e)e.hasOwnProperty(t)&&(i[t]=e[t]);switch(e.orientation){case 2:i.left=e.right,i.right=e.left;break;case 3:i.left=e.right,i.top=e.bottom,i.right=e.left,i.bottom=e.top;break;case 4:i.top=e.bottom,i.bottom=e.top;break;case 5:i.left=e.top,i.top=e.left,i.right=e.bottom,i.bottom=e.right;break;case 6:i.left=e.top,i.top=e.right,i.right=e.bottom,i.bottom=e.left;break;case 7:i.left=e.bottom,i.top=e.right,i.right=e.top,i.bottom=e.left;break;case 8:i.left=e.bottom,i.top=e.left,i.right=e.top,i.bottom=e.right}return e.orientation>4&&(i.maxWidth=e.maxHeight,i.maxHeight=e.maxWidth,i.minWidth=e.minHeight,i.minHeight=e.minWidth,i.sourceWidth=e.sourceHeight,i.sourceHeight=e.sourceWidth),i}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e(window.loadImage)}(function(e){"use strict";var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=t&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},e.metaDataParsers={jpeg:{65505:[]}},e.parseMetaData=function(t,i,a){a=a||{};var n=this,r=a.maxMetaDataSize||262144,o={},s=!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice);(s||!e.readFile(e.blobSlice.call(t,0,r),function(t){if(t.target.error)return console.log(t.target.error),void i(o);var r,s,d,l,c=t.target.result,u=new DataView(c),g=2,f=u.byteLength-4,h=g;if(65496===u.getUint16(0)){for(;f>g&&(r=u.getUint16(g),r>=65504&&65519>=r||65534===r);){if(s=u.getUint16(g+2)+2,g+s>u.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(d=e.metaDataParsers.jpeg[r])for(l=0;l<d.length;l+=1)d[l].call(n,u,g,s,o,a);g+=s,h=g}!a.disableImageHead&&h>6&&(o.imageHead=c.slice?c.slice(0,h):new Uint8Array(c).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");i(o)},"readAsArrayBuffer"))&&i(o)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],e):e(window.loadImage)}(function(e){"use strict";e.ExifMap=function(){return this},e.ExifMap.prototype.map={Orientation:274},e.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},e.getExifThumbnail=function(e,t,i){var a,n,r;if(!i||t+i>e.byteLength)return void console.log("Invalid Exif data: Invalid thumbnail data.");for(a=[],n=0;i>n;n+=1)r=e.getUint8(t+n),a.push((16>r?"0":"")+r.toString(16));return"data:image/jpeg,%"+a.join("%")},e.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},e.exifTagTypes[7]=e.exifTagTypes[1],e.getExifValue=function(t,i,a,n,r,o){var s,d,l,c,u,g,f=e.exifTagTypes[n];if(!f)return void console.log("Invalid Exif data: Invalid tag type.");if(s=f.size*r,d=s>4?i+t.getUint32(a+8,o):a+8,d+s>t.byteLength)return void console.log("Invalid Exif data: Invalid data offset.");if(1===r)return f.getValue(t,d,o);for(l=[],c=0;r>c;c+=1)l[c]=f.getValue(t,d+c*f.size,o);if(f.ascii){for(u="",c=0;c<l.length&&(g=l[c],"\0"!==g);c+=1)u+=g;return u}return l},e.parseExifTag=function(t,i,a,n,r){var o=t.getUint16(a,n);r.exif[o]=e.getExifValue(t,i,a,t.getUint16(a+2,n),t.getUint32(a+4,n),n)},e.parseExifTags=function(e,t,i,a,n){var r,o,s;if(i+6>e.byteLength)return void console.log("Invalid Exif data: Invalid directory offset.");if(r=e.getUint16(i,a),o=i+2+12*r,o+4>e.byteLength)return void console.log("Invalid Exif data: Invalid directory size.");for(s=0;r>s;s+=1)this.parseExifTag(e,t,i+2+12*s,a,n);return e.getUint32(o,a)},e.parseExifData=function(t,i,a,n,r){if(!r.disableExif){var o,s,d,l=i+10;if(1165519206===t.getUint32(i+4)){if(l+8>t.byteLength)return void console.log("Invalid Exif data: Invalid segment size.");if(0!==t.getUint16(i+8))return void console.log("Invalid Exif data: Missing byte alignment offset.");switch(t.getUint16(l)){case 18761:o=!0;break;case 19789:o=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}if(42!==t.getUint16(l+2,o))return void console.log("Invalid Exif data: Missing TIFF marker.");s=t.getUint32(l+4,o),n.exif=new e.ExifMap,s=e.parseExifTags(t,l,l+s,o,n),s&&!r.disableExifThumbnail&&(d={exif:{}},s=e.parseExifTags(t,l,l+s,o,d),d.exif[513]&&(n.exif.Thumbnail=e.getExifThumbnail(t,l+d.exif[513],d.exif[514]))),n.exif[34665]&&!r.disableExifSub&&e.parseExifTags(t,l,l+n.exif[34665],o,n),n.exif[34853]&&!r.disableExifGps&&e.parseExifTags(t,l,l+n.exif[34853],o,n)}}},e.metaDataParsers.jpeg[65505].push(e.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],e):e(window.loadImage)}(function(e){"use strict";e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(t[0],t[1],t[2],t[3]);case"ComponentsConfiguration":return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];case"GPSVersionID":return t[0]+"."+t[1]+"."+t[2]+"."+t[3]}return String(t)},function(e){var t,i=e.tags,a=e.map;for(t in i)i.hasOwnProperty(t)&&(a[i[t]]=t)}(e.ExifMap.prototype),e.ExifMap.prototype.getAll=function(){var e,t,i={};for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e],t&&(i[t]=this.getText(t)));return i}});
!function(a){"use strict";var b=function(a,c,d){var e,f,g=document.createElement("img");if(g.onerror=c,g.onload=function(){!f||d&&d.noRevoke||b.revokeObjectURL(f),c&&c(b.scale(g,d))},b.isInstanceOf("Blob",a)||b.isInstanceOf("File",a))e=f=b.createObjectURL(a),g._type=a.type;else{if("string"!=typeof a)return!1;e=a,d&&d.crossOrigin&&(g.crossOrigin=d.crossOrigin)}return e?(g.src=e,g):b.readFile(a,function(a){var b=a.target;b&&b.result?g.src=b.result:c&&c(a)})},c=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;b.isInstanceOf=function(a,b){return Object.prototype.toString.call(b)==="[object "+a+"]"},b.transformCoordinates=function(){},b.getTransformedOptions=function(a){return a},b.renderImageToCanvas=function(a,b,c,d,e,f,g,h,i,j){return a.getContext("2d").drawImage(b,c,d,e,f,g,h,i,j),a},b.hasCanvasOption=function(a){return a.canvas||a.crop},b.scale=function(a,c){c=c||{};var d,e,f,g,h,i,j,k,l,m=document.createElement("canvas"),n=a.getContext||b.hasCanvasOption(c)&&m.getContext,o=a.naturalWidth||a.width,p=a.naturalHeight||a.height,q=o,r=p,s=function(){var a=Math.max((f||q)/q,(g||r)/r);a>1&&(q=Math.ceil(q*a),r=Math.ceil(r*a))},t=function(){var a=Math.min((d||q)/q,(e||r)/r);1>a&&(q=Math.ceil(q*a),r=Math.ceil(r*a))};return n&&(c=b.getTransformedOptions(c),j=c.left||0,k=c.top||0,c.sourceWidth?(h=c.sourceWidth,void 0!==c.right&&void 0===c.left&&(j=o-h-c.right)):h=o-j-(c.right||0),c.sourceHeight?(i=c.sourceHeight,void 0!==c.bottom&&void 0===c.top&&(k=p-i-c.bottom)):i=p-k-(c.bottom||0),q=h,r=i),d=c.maxWidth,e=c.maxHeight,f=c.minWidth,g=c.minHeight,n&&d&&e&&c.crop?(q=d,r=e,l=h/i-d/e,0>l?(i=e*h/d,void 0===c.top&&void 0===c.bottom&&(k=(p-i)/2)):l>0&&(h=d*i/e,void 0===c.left&&void 0===c.right&&(j=(o-h)/2))):((c.contain||c.cover)&&(f=d=d||f,g=e=e||g),c.cover?(t(),s()):(s(),t())),n?(m.width=q,m.height=r,b.transformCoordinates(m,c),b.renderImageToCanvas(m,a,j,k,h,i,0,0,q,r)):(a.width=q,a.height=r,a)},b.createObjectURL=function(a){return c?c.createObjectURL(a):!1},b.revokeObjectURL=function(a){return c?c.revokeObjectURL(a):!1},b.readFile=function(a,b,c){if(window.FileReader){var d=new FileReader;if(d.onload=d.onerror=b,c=c||"readAsDataURL",d[c])return d[c](a),d}return!1},"function"==typeof define&&define.amd?define(function(){return b}):a.loadImage=b}(this),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var b=a.renderImageToCanvas;a.detectSubsampling=function(a){var b,c;return a.width*a.height>1048576?(b=document.createElement("canvas"),b.width=b.height=1,c=b.getContext("2d"),c.drawImage(a,-a.width+1,0),0===c.getImageData(0,0,1,1).data[3]):!1},a.detectVerticalSquash=function(a,b){var c,d,e,f,g,h=a.naturalHeight||a.height,i=document.createElement("canvas"),j=i.getContext("2d");for(b&&(h/=2),i.width=1,i.height=h,j.drawImage(a,0,0),c=j.getImageData(0,0,1,h).data,d=0,e=h,f=h;f>d;)g=c[4*(f-1)+3],0===g?e=f:d=f,f=e+d>>1;return f/h||1},a.renderImageToCanvas=function(c,d,e,f,g,h,i,j,k,l){if("image/jpeg"===d._type){var m,n,o,p,q=c.getContext("2d"),r=document.createElement("canvas"),s=1024,t=r.getContext("2d");if(r.width=s,r.height=s,q.save(),m=a.detectSubsampling(d),m&&(e/=2,f/=2,g/=2,h/=2),n=a.detectVerticalSquash(d,m),m||1!==n){for(f*=n,k=Math.ceil(s*k/g),l=Math.ceil(s*l/h/n),j=0,p=0;h>p;){for(i=0,o=0;g>o;)t.clearRect(0,0,s,s),t.drawImage(d,e,f,g,h,-o,-p,g,h),q.drawImage(r,0,0,s,s,i,j,k,l),o+=s,i+=k;p+=s,j+=l}return q.restore(),c}}return b(c,d,e,f,g,h,i,j,k,l)}}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=a.hasCanvasOption;a.hasCanvasOption=function(a){return b(a)||a.orientation},a.transformCoordinates=function(a,b){var c=a.getContext("2d"),d=a.width,e=a.height,f=b.orientation;if(f)switch(f>4&&(a.width=e,a.height=d),f){case 2:c.translate(d,0),c.scale(-1,1);break;case 3:c.translate(d,e),c.rotate(Math.PI);break;case 4:c.translate(0,e),c.scale(1,-1);break;case 5:c.rotate(.5*Math.PI),c.scale(1,-1);break;case 6:c.rotate(.5*Math.PI),c.translate(0,-e);break;case 7:c.rotate(.5*Math.PI),c.translate(d,-e),c.scale(-1,1);break;case 8:c.rotate(-.5*Math.PI),c.translate(-d,0)}},a.getTransformedOptions=function(a){if(!a.orientation||1===a.orientation)return a;var b,c={};for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);switch(a.orientation){case 2:c.left=a.right,c.right=a.left;break;case 3:c.left=a.right,c.top=a.bottom,c.right=a.left,c.bottom=a.top;break;case 4:c.top=a.bottom,c.bottom=a.top;break;case 5:c.left=a.top,c.top=a.left,c.right=a.bottom,c.bottom=a.right;break;case 6:c.left=a.top,c.top=a.right,c.right=a.bottom,c.bottom=a.left;break;case 7:c.left=a.bottom,c.top=a.right,c.right=a.top,c.bottom=a.left;break;case 8:c.left=a.bottom,c.top=a.left,c.right=a.top,c.bottom=a.right}return a.orientation>4&&(c.maxWidth=a.maxHeight,c.maxHeight=a.maxWidth,c.minWidth=a.minHeight,c.minHeight=a.minWidth,c.sourceWidth=a.sourceHeight,c.sourceHeight=a.sourceWidth),c}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);a.blobSlice=b&&function(){var a=this.slice||this.webkitSlice||this.mozSlice;return a.apply(this,arguments)},a.metaDataParsers={jpeg:{65505:[]}},a.parseMetaData=function(b,c,d){d=d||{};var e=this,f=d.maxMetaDataSize||262144,g={},h=!(window.DataView&&b&&b.size>=12&&"image/jpeg"===b.type&&a.blobSlice);(h||!a.readFile(a.blobSlice.call(b,0,f),function(b){if(b.target.error)return console.log(b.target.error),c(g),void 0;var f,h,i,j,k=b.target.result,l=new DataView(k),m=2,n=l.byteLength-4,o=m;if(65496===l.getUint16(0)){for(;n>m&&(f=l.getUint16(m),f>=65504&&65519>=f||65534===f);){if(h=l.getUint16(m+2)+2,m+h>l.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(i=a.metaDataParsers.jpeg[f])for(j=0;j<i.length;j+=1)i[j].call(e,l,m,h,g,d);m+=h,o=m}!d.disableImageHead&&o>6&&(g.imageHead=k.slice?k.slice(0,o):new Uint8Array(k).subarray(0,o))}else console.log("Invalid JPEG file: Missing JPEG marker.");c(g)},"readAsArrayBuffer"))&&c(g)}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap=function(){return this},a.ExifMap.prototype.map={Orientation:274},a.ExifMap.prototype.get=function(a){return this[a]||this[this.map[a]]},a.getExifThumbnail=function(a,b,c){var d,e,f;if(!c||b+c>a.byteLength)return console.log("Invalid Exif data: Invalid thumbnail data."),void 0;for(d=[],e=0;c>e;e+=1)f=a.getUint8(b+e),d.push((16>f?"0":"")+f.toString(16));return"data:image/jpeg,%"+d.join("%")},a.exifTagTypes={1:{getValue:function(a,b){return a.getUint8(b)},size:1},2:{getValue:function(a,b){return String.fromCharCode(a.getUint8(b))},size:1,ascii:!0},3:{getValue:function(a,b,c){return a.getUint16(b,c)},size:2},4:{getValue:function(a,b,c){return a.getUint32(b,c)},size:4},5:{getValue:function(a,b,c){return a.getUint32(b,c)/a.getUint32(b+4,c)},size:8},9:{getValue:function(a,b,c){return a.getInt32(b,c)},size:4},10:{getValue:function(a,b,c){return a.getInt32(b,c)/a.getInt32(b+4,c)},size:8}},a.exifTagTypes[7]=a.exifTagTypes[1],a.getExifValue=function(b,c,d,e,f,g){var h,i,j,k,l,m,n=a.exifTagTypes[e];if(!n)return console.log("Invalid Exif data: Invalid tag type."),void 0;if(h=n.size*f,i=h>4?c+b.getUint32(d+8,g):d+8,i+h>b.byteLength)return console.log("Invalid Exif data: Invalid data offset."),void 0;if(1===f)return n.getValue(b,i,g);for(j=[],k=0;f>k;k+=1)j[k]=n.getValue(b,i+k*n.size,g);if(n.ascii){for(l="",k=0;k<j.length&&(m=j[k],"\x00"!==m);k+=1)l+=m;return l}return j},a.parseExifTag=function(b,c,d,e,f){var g=b.getUint16(d,e);f.exif[g]=a.getExifValue(b,c,d,b.getUint16(d+2,e),b.getUint32(d+4,e),e)},a.parseExifTags=function(a,b,c,d,e){var f,g,h;if(c+6>a.byteLength)return console.log("Invalid Exif data: Invalid directory offset."),void 0;if(f=a.getUint16(c,d),g=c+2+12*f,g+4>a.byteLength)return console.log("Invalid Exif data: Invalid directory size."),void 0;for(h=0;f>h;h+=1)this.parseExifTag(a,b,c+2+12*h,d,e);return a.getUint32(g,d)},a.parseExifData=function(b,c,d,e,f){if(!f.disableExif){var g,h,i,j=c+10;if(1165519206===b.getUint32(c+4)){if(j+8>b.byteLength)return console.log("Invalid Exif data: Invalid segment size."),void 0;if(0!==b.getUint16(c+8))return console.log("Invalid Exif data: Missing byte alignment offset."),void 0;switch(b.getUint16(j)){case 18761:g=!0;break;case 19789:g=!1;break;default:return console.log("Invalid Exif data: Invalid byte alignment marker."),void 0}if(42!==b.getUint16(j+2,g))return console.log("Invalid Exif data: Missing TIFF marker."),void 0;h=b.getUint32(j+4,g),e.exif=new a.ExifMap,h=a.parseExifTags(b,j,j+h,g,e),h&&!f.disableExifThumbnail&&(i={exif:{}},h=a.parseExifTags(b,j,j+h,g,i),i.exif[513]&&(e.exif.Thumbnail=a.getExifThumbnail(b,j+i.exif[513],i.exif[514]))),e.exif[34665]&&!f.disableExifSub&&a.parseExifTags(b,j,j+e.exif[34665],g,e),e.exif[34853]&&!f.disableExifGps&&a.parseExifTags(b,j,j+e.exif[34853],g,e)}}},a.metaDataParsers.jpeg[65505].push(a.parseExifData)}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},a.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},a.ExifMap.prototype.getText=function(a){var b=this.get(a);switch(a){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[a][b];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(b[0],b[1],b[2],b[3]);case"ComponentsConfiguration":return this.stringValues[a][b[0]]+this.stringValues[a][b[1]]+this.stringValues[a][b[2]]+this.stringValues[a][b[3]];case"GPSVersionID":return b[0]+"."+b[1]+"."+b[2]+"."+b[3]}return String(b)},function(a){var b,c=a.tags,d=a.map;for(b in c)c.hasOwnProperty(b)&&(d[c[b]]=b)}(a.ExifMap.prototype),a.ExifMap.prototype.getAll=function(){var a,b,c={};for(a in this)this.hasOwnProperty(a)&&(b=this.tags[a],b&&(c[b]=this.getText(b)));return c}});
!function(t){"use strict";var e=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,n=t.Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),o=n&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),r=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,i=(n||r)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(t){var e,i,a,l,u,B;for(e=t.split(",")[0].indexOf("base64")>=0?atob(t.split(",")[1]):decodeURIComponent(t.split(",")[1]),i=new ArrayBuffer(e.length),a=new Uint8Array(i),l=0;l<e.length;l+=1)a[l]=e.charCodeAt(l);return u=t.split(",")[0].split(":")[1].split(";")[0],n?new Blob([o?a:i],{type:u}):(B=new r,B.append(i),B.getBlob(u))};t.HTMLCanvasElement&&!e.toBlob&&(e.mozGetAsFile?e.toBlob=function(t,n,o){t(o&&e.toDataURL&&i?i(this.toDataURL(n,o)):this.mozGetAsFile("blob",n))}:e.toDataURL&&i&&(e.toBlob=function(t,e,n){t(i(this.toDataURL(e,n)))})),"function"==typeof define&&define.amd?define(function(){return i}):t.dataURLtoBlob=i}(this);
!function(a){"use strict";var b=a.HTMLCanvasElement&&a.HTMLCanvasElement.prototype,c=a.Blob&&function(){try{return Boolean(new Blob)}catch(a){return!1}}(),d=c&&a.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(a){return!1}}(),e=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||a.MSBlobBuilder,f=(c||e)&&a.atob&&a.ArrayBuffer&&a.Uint8Array&&function(a){var b,f,g,h,i,j;for(b=a.split(",")[0].indexOf("base64")>=0?atob(a.split(",")[1]):decodeURIComponent(a.split(",")[1]),f=new ArrayBuffer(b.length),g=new Uint8Array(f),h=0;h<b.length;h+=1)g[h]=b.charCodeAt(h);return i=a.split(",")[0].split(":")[1].split(";")[0],c?new Blob([d?g:f],{type:i}):(j=new e,j.append(f),j.getBlob(i))};a.HTMLCanvasElement&&!b.toBlob&&(b.mozGetAsFile?b.toBlob=function(a,c,d){d&&b.toDataURL&&f?a(f(this.toDataURL(c,d))):a(this.mozGetAsFile("blob",c))}:b.toDataURL&&f&&(b.toBlob=function(a,b,c){a(f(this.toDataURL(b,c)))})),"function"==typeof define&&define.amd?define(function(){return f}):a.dataURLtoBlob=f}(this);
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):window.jQuery)}(function(e){"use strict";var t=0;e.ajaxTransport("iframe",function(r){if(r.async){var n,a,o,i=r.initialIframeSrc||"javascript:false;";return{send:function(p,m){n=e('<form style="display:none;"></form>'),n.attr("accept-charset",r.formAcceptCharset),o=/\?/.test(r.url)?"&":"?","DELETE"===r.type?(r.url=r.url+o+"_method=DELETE",r.type="POST"):"PUT"===r.type?(r.url=r.url+o+"_method=PUT",r.type="POST"):"PATCH"===r.type&&(r.url=r.url+o+"_method=PATCH",r.type="POST"),t+=1,a=e('<iframe src="'+i+'" name="iframe-transport-'+t+'"></iframe>').bind("load",function(){var t,o=e.isArray(r.paramName)?r.paramName:[r.paramName];a.unbind("load").bind("load",function(){var t;try{if(t=a.contents(),!t.length||!t[0].firstChild)throw new Error}catch(e){t=void 0}m(200,"success",{iframe:t}),e('<iframe src="'+i+'"></iframe>').appendTo(n),window.setTimeout(function(){n.remove()},0)}),n.prop("target",a.prop("name")).prop("action",r.url).prop("method",r.type),r.formData&&e.each(r.formData,function(t,r){e('<input type="hidden"/>').prop("name",r.name).val(r.value).appendTo(n)}),r.fileInput&&r.fileInput.length&&"POST"===r.type&&(t=r.fileInput.clone(),r.fileInput.after(function(e){return t[e]}),r.paramName&&r.fileInput.each(function(t){e(this).prop("name",o[t]||r.paramName)}),n.append(r.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data"),r.fileInput.removeAttr("form")),n.submit(),t&&t.length&&r.fileInput.each(function(r,n){var a=e(t[r]);e(n).prop("name",a.prop("name")).attr("form",a.attr("form")),a.replaceWith(n)})}),n.append(a).appendTo(document.body)},abort:function(){a&&a.unbind("load").prop("src",i),n&&n.remove()}}}}),e.ajaxSetup({converters:{"iframe text":function(t){return t&&e(t[0].body).text()},"iframe json":function(t){return t&&e.parseJSON(e(t[0].body).text())},"iframe html":function(t){return t&&e(t[0].body).html()},"iframe xml":function(t){var r=t&&t[0];return r&&e.isXMLDoc(r)?r:e.parseXML(r.XMLDocument&&r.XMLDocument.xml||e(r.body).html())},"iframe script":function(t){return t&&e.globalEval(e(t[0].body).text())}}})});
/*
 * jQuery Iframe Transport Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery.ui.widget"],e):"object"==typeof exports?e(require("jquery"),require("./vendor/jquery.ui.widget")):e(window.jQuery)}(function(e){"use strict";function t(t){var i="dragover"===t;return function(r){r.dataTransfer=r.originalEvent&&r.originalEvent.dataTransfer;var n=r.dataTransfer;n&&e.inArray("Files",n.types)!==-1&&this._trigger(t,e.Event(t,{delegatedEvent:r}))!==!1&&(r.preventDefault(),i&&(n.dropEffect="copy"))}}e.support.fileInput=!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||e('<input type="file">').prop("disabled")),e.support.xhrFileUpload=!(!window.ProgressEvent||!window.FileReader),e.support.xhrFormDataFileUpload=!!window.FormData,e.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice),e.widget("blueimp.fileupload",{options:{dropZone:e(document),pasteZone:void 0,fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,limitMultiFileUploadSize:void 0,limitMultiFileUploadSizeOverhead:512,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(t,i){return t=this.messages[t]||t.toString(),i&&e.each(i,function(e,i){t=t.replace("{"+e+"}",i)}),t},formData:function(e){return e.serializeArray()},add:function(t,i){return!t.isDefaultPrevented()&&void((i.autoUpload||i.autoUpload!==!1&&e(this).fileupload("option","autoUpload"))&&i.process().done(function(){i.submit()}))},processData:!1,contentType:!1,cache:!1,timeout:0},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:e.support.blobSlice&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},_BitrateTimer:function(){this.timestamp=Date.now?Date.now():(new Date).getTime(),this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,i){var r=e-this.timestamp;return(!this.bitrate||!i||r>i)&&(this.bitrate=(t-this.loaded)*(1e3/r)*8,this.loaded=t,this.timestamp=e),this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var i;return"function"===e.type(t.formData)?t.formData(t.form):e.isArray(t.formData)?t.formData:"object"===e.type(t.formData)?(i=[],e.each(t.formData,function(e,t){i.push({name:e,value:t})}),i):[]},_getTotal:function(t){var i=0;return e.each(t,function(e,t){i+=t.size||1}),i},_initProgressObject:function(t){var i={loaded:0,total:0,bitrate:0};t._progress?e.extend(t._progress,i):t._progress=i},_initResponseObject:function(e){var t;if(e._response)for(t in e._response)e._response.hasOwnProperty(t)&&delete e._response[t];else e._response={}},_onProgress:function(t,i){if(t.lengthComputable){var r,n=Date.now?Date.now():(new Date).getTime();if(i._time&&i.progressInterval&&n-i._time<i.progressInterval&&t.loaded!==t.total)return;i._time=n,r=Math.floor(t.loaded/t.total*(i.chunkSize||i._progress.total))+(i.uploadedBytes||0),this._progress.loaded+=r-i._progress.loaded,this._progress.bitrate=this._bitrateTimer.getBitrate(n,this._progress.loaded,i.bitrateInterval),i._progress.loaded=i.loaded=r,i._progress.bitrate=i.bitrate=i._bitrateTimer.getBitrate(n,r,i.bitrateInterval),this._trigger("progress",e.Event("progress",{delegatedEvent:t}),i),this._trigger("progressall",e.Event("progressall",{delegatedEvent:t}),this._progress)}},_initProgressListener:function(t){var i=this,r=t.xhr?t.xhr():e.ajaxSettings.xhr();r.upload&&(e(r.upload).bind("progress",function(e){var r=e.originalEvent;e.lengthComputable=r.lengthComputable,e.loaded=r.loaded,e.total=r.total,i._onProgress(e,t)}),t.xhr=function(){return r})},_isInstanceOf:function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},_initXHRData:function(t){var i,r=this,n=t.files[0],o=t.multipart||!e.support.xhrFileUpload,s="array"===e.type(t.paramName)?t.paramName[0]:t.paramName;t.headers=e.extend({},t.headers),t.contentRange&&(t.headers["Content-Range"]=t.contentRange),o&&!t.blob&&this._isInstanceOf("File",n)||(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"'),o?e.support.xhrFormDataFileUpload&&(t.postMessage?(i=this._getFormData(t),t.blob?i.push({name:s,value:t.blob}):e.each(t.files,function(r,n){i.push({name:"array"===e.type(t.paramName)&&t.paramName[r]||s,value:n})})):(r._isInstanceOf("FormData",t.formData)?i=t.formData:(i=new FormData,e.each(this._getFormData(t),function(e,t){i.append(t.name,t.value)})),t.blob?i.append(s,t.blob,n.name):e.each(t.files,function(n,o){(r._isInstanceOf("File",o)||r._isInstanceOf("Blob",o))&&i.append("array"===e.type(t.paramName)&&t.paramName[n]||s,o,o.uploadName||o.name)})),t.data=i):(t.contentType=n.type||"application/octet-stream",t.data=t.blob||n),t.blob=null},_initIframeSettings:function(t){var i=e("<a></a>").prop("href",t.url).prop("host");t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&i&&i!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e)},_getParamName:function(t){var i=e(t.fileInput),r=t.paramName;return r?e.isArray(r)||(r=[r]):(r=[],i.each(function(){for(var t=e(this),i=t.prop("name")||"files[]",n=(t.prop("files")||[1]).length;n;)r.push(i),n-=1}),r.length||(r=[i.prop("name")||"files[]"])),r},_initFormSettings:function(t){t.form&&t.form.length||(t.form=e(t.fileInput.prop("form")),t.form.length||(t.form=e(this.options.fileInput.prop("form")))),t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||"string"===e.type(t.form.prop("method"))&&t.form.prop("method")||"").toUpperCase(),"POST"!==t.type&&"PUT"!==t.type&&"PATCH"!==t.type&&(t.type="POST"),t.formAcceptCharset||(t.formAcceptCharset=t.form.attr("accept-charset"))},_getAJAXSettings:function(t){var i=e.extend({},this.options,t);return this._initFormSettings(i),this._initDataSettings(i),i},_getDeferredState:function(e){return e.state?e.state():e.isResolved()?"resolved":e.isRejected()?"rejected":"pending"},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,i,r){var n=e.Deferred(),o=n.promise();return i=i||this.options.context||o,t===!0?n.resolveWith(i,r):t===!1&&n.rejectWith(i,r),o.abort=n.promise,this._enhancePromise(o)},_addConvenienceMethods:function(t,i){var r=this,n=function(t){return e.Deferred().resolveWith(r,t).promise()};i.process=function(t,o){return(t||o)&&(i._processQueue=this._processQueue=(this._processQueue||n([this])).pipe(function(){return i.errorThrown?e.Deferred().rejectWith(r,[i]).promise():n(arguments)}).pipe(t,o)),this._processQueue||n([this])},i.submit=function(){return"pending"!==this.state()&&(i.jqXHR=this.jqXHR=r._trigger("submit",e.Event("submit",{delegatedEvent:t}),this)!==!1&&r._onSend(t,this)),this.jqXHR||r._getXHRPromise()},i.abort=function(){return this.jqXHR?this.jqXHR.abort():(this.errorThrown="abort",r._trigger("fail",null,this),r._getXHRPromise(!1))},i.state=function(){return this.jqXHR?r._getDeferredState(this.jqXHR):this._processQueue?r._getDeferredState(this._processQueue):void 0},i.processing=function(){return!this.jqXHR&&this._processQueue&&"pending"===r._getDeferredState(this._processQueue)},i.progress=function(){return this._progress},i.response=function(){return this._response}},_getUploadedBytes:function(e){var t=e.getResponseHeader("Range"),i=t&&t.split("-"),r=i&&i.length>1&&parseInt(i[1],10);return r&&r+1},_chunkedUpload:function(t,i){t.uploadedBytes=t.uploadedBytes||0;var r,n,o=this,s=t.files[0],a=s.size,l=t.uploadedBytes,p=t.maxChunkSize||a,u=this._blobSlice,d=e.Deferred(),h=d.promise();return!(!(this._isXHRUpload(t)&&u&&(l||p<a))||t.data)&&(!!i||(l>=a?(s.error=t.i18n("uploadedBytes"),this._getXHRPromise(!1,t.context,[null,"error",s.error])):(n=function(){var i=e.extend({},t),h=i._progress.loaded;i.blob=u.call(s,l,l+p,s.type),i.chunkSize=i.blob.size,i.contentRange="bytes "+l+"-"+(l+i.chunkSize-1)+"/"+a,o._initXHRData(i),o._initProgressListener(i),r=(o._trigger("chunksend",null,i)!==!1&&e.ajax(i)||o._getXHRPromise(!1,i.context)).done(function(r,s,p){l=o._getUploadedBytes(p)||l+i.chunkSize,h+i.chunkSize-i._progress.loaded&&o._onProgress(e.Event("progress",{lengthComputable:!0,loaded:l-i.uploadedBytes,total:l-i.uploadedBytes}),i),t.uploadedBytes=i.uploadedBytes=l,i.result=r,i.textStatus=s,i.jqXHR=p,o._trigger("chunkdone",null,i),o._trigger("chunkalways",null,i),l<a?n():d.resolveWith(i.context,[r,s,p])}).fail(function(e,t,r){i.jqXHR=e,i.textStatus=t,i.errorThrown=r,o._trigger("chunkfail",null,i),o._trigger("chunkalways",null,i),d.rejectWith(i.context,[e,t,r])})},this._enhancePromise(h),h.abort=function(){return r.abort()},n(),h)))},_beforeSend:function(e,t){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer,this._progress.loaded=this._progress.total=0,this._progress.bitrate=0),this._initResponseObject(t),this._initProgressObject(t),t._progress.loaded=t.loaded=t.uploadedBytes||0,t._progress.total=t.total=this._getTotal(t.files)||1,t._progress.bitrate=t.bitrate=0,this._active+=1,this._progress.loaded+=t.loaded,this._progress.total+=t.total},_onDone:function(t,i,r,n){var o=n._progress.total,s=n._response;n._progress.loaded<o&&this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:o,total:o}),n),s.result=n.result=t,s.textStatus=n.textStatus=i,s.jqXHR=n.jqXHR=r,this._trigger("done",null,n)},_onFail:function(e,t,i,r){var n=r._response;r.recalculateProgress&&(this._progress.loaded-=r._progress.loaded,this._progress.total-=r._progress.total),n.jqXHR=r.jqXHR=e,n.textStatus=r.textStatus=t,n.errorThrown=r.errorThrown=i,this._trigger("fail",null,r)},_onAlways:function(e,t,i,r){this._trigger("always",null,r)},_onSend:function(t,i){i.submit||this._addConvenienceMethods(t,i);var r,n,o,s,a=this,l=a._getAJAXSettings(i),p=function(){return a._sending+=1,l._bitrateTimer=new a._BitrateTimer,r=r||((n||a._trigger("send",e.Event("send",{delegatedEvent:t}),l)===!1)&&a._getXHRPromise(!1,l.context,n)||a._chunkedUpload(l)||e.ajax(l)).done(function(e,t,i){a._onDone(e,t,i,l)}).fail(function(e,t,i){a._onFail(e,t,i,l)}).always(function(e,t,i){if(a._onAlways(e,t,i,l),a._sending-=1,a._active-=1,l.limitConcurrentUploads&&l.limitConcurrentUploads>a._sending)for(var r=a._slots.shift();r;){if("pending"===a._getDeferredState(r)){r.resolve();break}r=a._slots.shift()}0===a._active&&a._trigger("stop")})};return this._beforeSend(t,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(o=e.Deferred(),this._slots.push(o),s=o.pipe(p)):(this._sequence=this._sequence.pipe(p,p),s=this._sequence),s.abort=function(){return n=[void 0,"abort","abort"],r?r.abort():(o&&o.rejectWith(l.context,n),p())},this._enhancePromise(s)):p()},_onAdd:function(t,i){var r,n,o,s,a=this,l=!0,p=e.extend({},this.options,i),u=i.files,d=u.length,h=p.limitMultiFileUploads,c=p.limitMultiFileUploadSize,f=p.limitMultiFileUploadSizeOverhead,g=0,_=this._getParamName(p),m=0;if(!d)return!1;if(c&&void 0===u[0].size&&(c=void 0),(p.singleFileUploads||h||c)&&this._isXHRUpload(p))if(p.singleFileUploads||c||!h)if(!p.singleFileUploads&&c)for(o=[],r=[],s=0;s<d;s+=1)g+=u[s].size+f,(s+1===d||g+u[s+1].size+f>c||h&&s+1-m>=h)&&(o.push(u.slice(m,s+1)),n=_.slice(m,s+1),n.length||(n=_),r.push(n),m=s+1,g=0);else r=_;else for(o=[],r=[],s=0;s<d;s+=h)o.push(u.slice(s,s+h)),n=_.slice(s,s+h),n.length||(n=_),r.push(n);else o=[u],r=[_];return i.originalFiles=u,e.each(o||u,function(n,s){var p=e.extend({},i);return p.files=o?s:[s],p.paramName=r[n],a._initResponseObject(p),a._initProgressObject(p),a._addConvenienceMethods(t,p),l=a._trigger("add",e.Event("add",{delegatedEvent:t}),p)}),l},_replaceFileInput:function(t){var i=t.fileInput,r=i.clone(!0),n=i.is(document.activeElement);t.fileInputClone=r,e("<form></form>").append(r)[0].reset(),i.after(r).detach(),n&&r.focus(),e.cleanData(i.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(e,t){return t===i[0]?r[0]:t}),i[0]===this.element[0]&&(this.element=r)},_handleFileTreeEntry:function(t,i){var r,n=this,o=e.Deferred(),s=function(e){e&&!e.entry&&(e.entry=t),o.resolve([e])},a=function(e){n._handleFileTreeEntries(e,i+t.name+"/").done(function(e){o.resolve(e)}).fail(s)},l=function(){r.readEntries(function(e){e.length?(p=p.concat(e),l()):a(p)},s)},p=[];return i=i||"",t.isFile?t._file?(t._file.relativePath=i,o.resolve(t._file)):t.file(function(e){e.relativePath=i,o.resolve(e)},s):t.isDirectory?(r=t.createReader(),l()):o.resolve([]),o.promise()},_handleFileTreeEntries:function(t,i){var r=this;return e.when.apply(e,e.map(t,function(e){return r._handleFileTreeEntry(e,i)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(t){t=t||{};var i=t.items;return i&&i.length&&(i[0].webkitGetAsEntry||i[0].getAsEntry)?this._handleFileTreeEntries(e.map(i,function(e){var t;return e.webkitGetAsEntry?(t=e.webkitGetAsEntry(),t&&(t._file=e.getAsFile()),t):e.getAsEntry()})):e.Deferred().resolve(e.makeArray(t.files)).promise()},_getSingleFileInputFiles:function(t){t=e(t);var i,r,n=t.prop("webkitEntries")||t.prop("entries");if(n&&n.length)return this._handleFileTreeEntries(n);if(i=e.makeArray(t.prop("files")),i.length)void 0===i[0].name&&i[0].fileName&&e.each(i,function(e,t){t.name=t.fileName,t.size=t.fileSize});else{if(r=t.prop("value"),!r)return e.Deferred().resolve([]).promise();i=[{name:r.replace(/^.*\\/,"")}]}return e.Deferred().resolve(i).promise()},_getFileInputFiles:function(t){return t instanceof e&&1!==t.length?e.when.apply(e,e.map(t,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)}):this._getSingleFileInputFiles(t)},_onChange:function(t){var i=this,r={fileInput:e(t.target),form:e(t.target.form)};this._getFileInputFiles(r.fileInput).always(function(n){r.files=n,i.options.replaceFileInput&&i._replaceFileInput(r),i._trigger("change",e.Event("change",{delegatedEvent:t}),r)!==!1&&i._onAdd(t,r)})},_onPaste:function(t){var i=t.originalEvent&&t.originalEvent.clipboardData&&t.originalEvent.clipboardData.items,r={files:[]};i&&i.length&&(e.each(i,function(e,t){var i=t.getAsFile&&t.getAsFile();i&&r.files.push(i)}),this._trigger("paste",e.Event("paste",{delegatedEvent:t}),r)!==!1&&this._onAdd(t,r))},_onDrop:function(t){t.dataTransfer=t.originalEvent&&t.originalEvent.dataTransfer;var i=this,r=t.dataTransfer,n={};r&&r.files&&r.files.length&&(t.preventDefault(),this._getDroppedFiles(r).always(function(r){n.files=r,i._trigger("drop",e.Event("drop",{delegatedEvent:t}),n)!==!1&&i._onAdd(t,n)}))},_onDragOver:t("dragover"),_onDragEnter:t("dragenter"),_onDragLeave:t("dragleave"),_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop,dragenter:this._onDragEnter,dragleave:this._onDragLeave}),this._on(this.options.pasteZone,{paste:this._onPaste})),e.support.fileInput&&this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragenter dragleave dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(t,i){var r=e.inArray(t,this._specialOptions)!==-1;r&&this._destroyEventHandlers(),this._super(t,i),r&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;void 0===t.fileInput?t.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone)),t.pasteZone instanceof e||(t.pasteZone=e(t.pasteZone))},_getRegExp:function(e){var t=e.split("/"),i=t.pop();return t.shift(),new RegExp(t.join("/"),i)},_isRegExpOption:function(t,i){return"url"!==t&&"string"===e.type(i)&&/^\/.*\/[igm]{0,3}$/.test(i)},_initDataAttributes:function(){var t=this,i=this.options,r=this.element.data();e.each(this.element[0].attributes,function(e,n){var o,s=n.name.toLowerCase();/^data-/.test(s)&&(s=s.slice(5).replace(/-[a-z]/g,function(e){return e.charAt(1).toUpperCase()}),o=r[s],t._isRegExpOption(s,o)&&(o=t._getRegExp(o)),i[s]=o)})},_create:function(){this._initDataAttributes(),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=0,this._initProgressObject(this),this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},add:function(t){var i=this;t&&!this.options.disabled&&(t.fileInput&&!t.files?this._getFileInputFiles(t.fileInput).always(function(e){t.files=e,i._onAdd(null,t)}):(t.files=e.makeArray(t.files),this._onAdd(null,t)))},send:function(t){if(t&&!this.options.disabled){if(t.fileInput&&!t.files){var i,r,n=this,o=e.Deferred(),s=o.promise();return s.abort=function(){return r=!0,i?i.abort():(o.reject(null,"abort","abort"),s)},this._getFileInputFiles(t.fileInput).always(function(e){if(!r){if(!e.length)return void o.reject();t.files=e,i=n._onSend(null,t),i.then(function(e,t,i){o.resolve(e,t,i)},function(e,t,i){o.reject(e,t,i)})}}),this._enhancePromise(s)}if(t.files=e.makeArray(t.files),t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})});
/*
 * jQuery File Upload Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
        );
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (!filesLength) {
                return false;
            }
            if (limitSize && files[0].size === undefined) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true),
                restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
                inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fileupload"],e):e("object"==typeof exports?require("jquery"):window.jQuery)}(function(e){"use strict";var s=e.blueimp.fileupload.prototype.options.add;e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{processQueue:[],add:function(r,i){var o=e(this);i.process(function(){return o.fileupload("process",i)}),s.call(this,r,i)}},processActions:{},_processFile:function(s,r){var i=this,o=e.Deferred().resolveWith(i,[s]),t=o.promise();return this._trigger("process",null,s),e.each(s.processQueue,function(s,o){var n=function(s){return r.errorThrown?e.Deferred().rejectWith(i,[r]).promise():i.processActions[o.action].call(i,s,o)};t=t.pipe(n,o.always&&n)}),t.done(function(){i._trigger("processdone",null,s),i._trigger("processalways",null,s)}).fail(function(){i._trigger("processfail",null,s),i._trigger("processalways",null,s)}),t},_transformProcessQueue:function(s){var r=[];e.each(s.processQueue,function(){var i={},o=this.action,t=this.prefix===!0?o:this.prefix;e.each(this,function(r,o){"string"===e.type(o)&&"@"===o.charAt(0)?i[r]=s[o.slice(1)||(t?t+r.charAt(0).toUpperCase()+r.slice(1):r)]:i[r]=o}),r.push(i)}),s.processQueue=r},processing:function(){return this._processing},process:function(s){var r=this,i=e.extend({},this.options,s);return i.processQueue&&i.processQueue.length&&(this._transformProcessQueue(i),0===this._processing&&this._trigger("processstart"),e.each(s.files,function(o){var t=o?e.extend({},i):i,n=function(){return s.errorThrown?e.Deferred().rejectWith(r,[s]).promise():r._processFile(t,s)};t.index=o,r._processing+=1,r._processingQueue=r._processingQueue.pipe(n,n).always(function(){r._processing-=1,0===r._processing&&r._trigger("processstop")})})),this._processingQueue},_create:function(){this._super(),this._processing=0,this._processingQueue=e.Deferred().resolveWith(this).promise()}})});
/*
 * jQuery File Upload Processing Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    var originalAdd = $.blueimp.fileupload.prototype.options.add;

    // The File Upload Processing plugin extends the fileupload widget
    // with file processing functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The list of processing actions:
            processQueue: [
                /*
                {
                    action: 'log',
                    type: 'debug'
                }
                */
            ],
            add: function (e, data) {
                var $this = $(this);
                data.process(function () {
                    return $this.fileupload('process', data);
                });
                originalAdd.call(this, e, data);
            }
        },

        processActions: {
            /*
            log: function (data, options) {
                console[options.type](
                    'Processing "' + data.files[data.index].name + '"'
                );
            }
            */
        },

        _processFile: function (data, originalData) {
            var that = this,
                dfd = $.Deferred().resolveWith(that, [data]),
                chain = dfd.promise();
            this._trigger('process', null, data);
            $.each(data.processQueue, function (i, settings) {
                var func = function (data) {
                    if (originalData.errorThrown) {
                        return $.Deferred()
                                .rejectWith(that, [originalData]).promise();
                    }
                    return that.processActions[settings.action].call(
                        that,
                        data,
                        settings
                    );
                };
                chain = chain.pipe(func, settings.always && func);
            });
            chain
                .done(function () {
                    that._trigger('processdone', null, data);
                    that._trigger('processalways', null, data);
                })
                .fail(function () {
                    that._trigger('processfail', null, data);
                    that._trigger('processalways', null, data);
                });
            return chain;
        },

        // Replaces the settings of each processQueue item that
        // are strings starting with an "@", using the remaining
        // substring as key for the option map,
        // e.g. "@autoUpload" is replaced with options.autoUpload:
        _transformProcessQueue: function (options) {
            var processQueue = [];
            $.each(options.processQueue, function () {
                var settings = {},
                    action = this.action,
                    prefix = this.prefix === true ? action : this.prefix;
                $.each(this, function (key, value) {
                    if ($.type(value) === 'string' &&
                            value.charAt(0) === '@') {
                        settings[key] = options[
                            value.slice(1) || (prefix ? prefix +
                                key.charAt(0).toUpperCase() + key.slice(1) : key)
                        ];
                    } else {
                        settings[key] = value;
                    }

                });
                processQueue.push(settings);
            });
            options.processQueue = processQueue;
        },

        // Returns the number of files currently in the processsing queue:
        processing: function () {
            return this._processing;
        },

        // Processes the files given as files property of the data parameter,
        // returns a Promise object that allows to bind callbacks:
        process: function (data) {
            var that = this,
                options = $.extend({}, this.options, data);
            if (options.processQueue && options.processQueue.length) {
                this._transformProcessQueue(options);
                if (this._processing === 0) {
                    this._trigger('processstart');
                }
                $.each(data.files, function (index) {
                    var opts = index ? $.extend({}, options) : options,
                        func = function () {
                            if (data.errorThrown) {
                                return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                            }
                            return that._processFile(opts, data);
                        };
                    opts.index = index;
                    that._processing += 1;
                    that._processingQueue = that._processingQueue.pipe(func, func)
                        .always(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that._trigger('processstop');
                            }
                        });
                });
            }
            return this._processingQueue;
        },

        _create: function () {
            this._super();
            this._processing = 0;
            this._processingQueue = $.Deferred().resolveWith(this)
                .promise();
        }

    });

}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","load-image","load-image-meta","load-image-exif","load-image-ios","canvas-to-blob","./jquery.fileupload-process"],e):"object"==typeof exports?e(require("jquery"),require("load-image")):e(window.jQuery,window.loadImage)}(function(e,i){"use strict";e.blueimp.fileupload.prototype.options.processQueue.unshift({action:"loadImageMetaData",disableImageHead:"@",disableExif:"@",disableExifThumbnail:"@",disableExifSub:"@",disableExifGps:"@",disabled:"@disableImageMetaDataLoad"},{action:"loadImage",prefix:!0,fileTypes:"@",maxFileSize:"@",noRevoke:"@",disabled:"@disableImageLoad"},{action:"resizeImage",prefix:"image",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",forceResize:"@",disabled:"@disableImageResize"},{action:"saveImage",quality:"@imageQuality",type:"@imageType",disabled:"@disableImageResize"},{action:"saveImageMetaData",disabled:"@disableImageMetaDataSave"},{action:"resizeImage",prefix:"preview",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",thumbnail:"@",canvas:"@",disabled:"@disableImagePreview"},{action:"setImage",name:"@imagePreviewName",disabled:"@disableImagePreview"},{action:"deleteImageReferences",disabled:"@disableImageReferencesDeletion"}),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{loadImageFileTypes:/^image\/(gif|jpeg|png|svg\+xml)$/,loadImageMaxFileSize:1e7,imageMaxWidth:1920,imageMaxHeight:1080,imageOrientation:!1,imageCrop:!1,disableImageResize:!0,previewMaxWidth:80,previewMaxHeight:80,previewOrientation:!0,previewThumbnail:!0,previewCrop:!1,previewCanvas:!0},processActions:{loadImage:function(a,t){if(t.disabled)return a;var n=this,s=a.files[a.index],r=e.Deferred();return"number"===e.type(t.maxFileSize)&&s.size>t.maxFileSize||t.fileTypes&&!t.fileTypes.test(s.type)||!i(s,function(e){e.src&&(a.img=e),r.resolveWith(n,[a])},t)?a:r.promise()},resizeImage:function(a,t){if(t.disabled||!a.canvas&&!a.img)return a;t=e.extend({canvas:!0},t);var n,s=this,r=e.Deferred(),o=t.canvas&&a.canvas||a.img,d=function(e){e&&(e.width!==o.width||e.height!==o.height||t.forceResize)&&(a[e.getContext?"canvas":"img"]=e),a.preview=e,r.resolveWith(s,[a])};if(a.exif){if(t.orientation===!0&&(t.orientation=a.exif.get("Orientation")),t.thumbnail&&(n=a.exif.get("Thumbnail")))return i(n,d,t),r.promise();a.orientation?delete t.orientation:a.orientation=t.orientation}return o?(d(i.scale(o,t)),r.promise()):a},saveImage:function(i,a){if(!i.canvas||a.disabled)return i;var t=this,n=i.files[i.index],s=e.Deferred();return i.canvas.toBlob?(i.canvas.toBlob(function(e){e.name||(n.type===e.type?e.name=n.name:n.name&&(e.name=n.name.replace(/\.\w+$/,"."+e.type.substr(6)))),n.type!==e.type&&delete i.imageHead,i.files[i.index]=e,s.resolveWith(t,[i])},a.type||n.type,a.quality),s.promise()):i},loadImageMetaData:function(a,t){if(t.disabled)return a;var n=this,s=e.Deferred();return i.parseMetaData(a.files[a.index],function(i){e.extend(a,i),s.resolveWith(n,[a])},t),s.promise()},saveImageMetaData:function(e,i){if(!(e.imageHead&&e.canvas&&e.canvas.toBlob)||i.disabled)return e;var a=e.files[e.index],t=new Blob([e.imageHead,this._blobSlice.call(a,20)],{type:a.type});return t.name=a.name,e.files[e.index]=t,e},setImage:function(e,i){return e.preview&&!i.disabled&&(e.files[e.index][i.name||"preview"]=e.preview),e},deleteImageReferences:function(e,i){return i.disabled||(delete e.img,delete e.canvas,delete e.preview,delete e.imageHead),e}}})});
/*
 * jQuery File Upload Image Preview & Resize Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, Blob */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            'load-image-meta',
            'load-image-exif',
            'load-image-ios',
            'canvas-to-blob',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('load-image')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadImageMetaData',
            disableImageHead: '@',
            disableExif: '@',
            disableExifThumbnail: '@',
            disableExifSub: '@',
            disableExifGps: '@',
            disabled: '@disableImageMetaDataLoad'
        },
        {
            action: 'loadImage',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            noRevoke: '@',
            disabled: '@disableImageLoad'
        },
        {
            action: 'resizeImage',
            // Use "image" as prefix for the "@" options:
            prefix: 'image',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            forceResize: '@',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImage',
            quality: '@imageQuality',
            type: '@imageType',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImageMetaData',
            disabled: '@disableImageMetaDataSave'
        },
        {
            action: 'resizeImage',
            // Use "preview" as prefix for the "@" options:
            prefix: 'preview',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            thumbnail: '@',
            canvas: '@',
            disabled: '@disableImagePreview'
        },
        {
            action: 'setImage',
            name: '@imagePreviewName',
            disabled: '@disableImagePreview'
        },
        {
            action: 'deleteImageReferences',
            disabled: '@disableImageReferencesDeletion'
        }
    );

    // The File Upload Resize plugin extends the fileupload widget
    // with image resize functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of images to load:
            // matched against the file type:
            loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
            // The maximum file size of images to load:
            loadImageMaxFileSize: 10000000, // 10MB
            // The maximum width of resized images:
            imageMaxWidth: 1920,
            // The maximum height of resized images:
            imageMaxHeight: 1080,
            // Defines the image orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            imageOrientation: false,
            // Define if resized images should be cropped or only scaled:
            imageCrop: false,
            // Disable the resize image functionality by default:
            disableImageResize: true,
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // Defines the preview orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            previewOrientation: true,
            // Create the preview using the Exif data thumbnail:
            previewThumbnail: true,
            // Define if preview images should be cropped or only scaled:
            previewCrop: false,
            // Define if preview images should be resized as canvas elements:
            previewCanvas: true
        },

        processActions: {

            // Loads the image given via data.files and data.index
            // as img element, if the browser supports the File API.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadImage: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (($.type(options.maxFileSize) === 'number' &&
                            file.size > options.maxFileSize) ||
                        (options.fileTypes &&
                            !options.fileTypes.test(file.type)) ||
                        !loadImage(
                            file,
                            function (img) {
                                if (img.src) {
                                    data.img = img;
                                }
                                dfd.resolveWith(that, [data]);
                            },
                            options
                        )) {
                    return data;
                }
                return dfd.promise();
            },

            // Resizes the image given as data.canvas or data.img
            // and updates data.canvas or data.img with the resized image.
            // Also stores the resized image as preview property.
            // Accepts the options maxWidth, maxHeight, minWidth,
            // minHeight, canvas and crop:
            resizeImage: function (data, options) {
                if (options.disabled || !(data.canvas || data.img)) {
                    return data;
                }
                options = $.extend({canvas: true}, options);
                var that = this,
                    dfd = $.Deferred(),
                    img = (options.canvas && data.canvas) || data.img,
                    resolve = function (newImg) {
                        if (newImg && (newImg.width !== img.width ||
                                newImg.height !== img.height ||
                                options.forceResize)) {
                            data[newImg.getContext ? 'canvas' : 'img'] = newImg;
                        }
                        data.preview = newImg;
                        dfd.resolveWith(that, [data]);
                    },
                    thumbnail;
                if (data.exif) {
                    if (options.orientation === true) {
                        options.orientation = data.exif.get('Orientation');
                    }
                    if (options.thumbnail) {
                        thumbnail = data.exif.get('Thumbnail');
                        if (thumbnail) {
                            loadImage(thumbnail, resolve, options);
                            return dfd.promise();
                        }
                    }
                    // Prevent orienting the same image twice:
                    if (data.orientation) {
                        delete options.orientation;
                    } else {
                        data.orientation = options.orientation;
                    }
                }
                if (img) {
                    resolve(loadImage.scale(img, options));
                    return dfd.promise();
                }
                return data;
            },

            // Saves the processed image given as data.canvas
            // inplace at data.index of data.files:
            saveImage: function (data, options) {
                if (!data.canvas || options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (data.canvas.toBlob) {
                    data.canvas.toBlob(
                        function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\.\w+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            // Don't restore invalid meta data:
                            if (file.type !== blob.type) {
                                delete data.imageHead;
                            }
                            // Store the created blob at the position
                            // of the original file in the files list:
                            data.files[data.index] = blob;
                            dfd.resolveWith(that, [data]);
                        },
                        options.type || file.type,
                        options.quality
                    );
                } else {
                    return data;
                }
                return dfd.promise();
            },

            loadImageMetaData: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    dfd = $.Deferred();
                loadImage.parseMetaData(data.files[data.index], function (result) {
                    $.extend(data, result);
                    dfd.resolveWith(that, [data]);
                }, options);
                return dfd.promise();
            },

            saveImageMetaData: function (data, options) {
                if (!(data.imageHead && data.canvas &&
                        data.canvas.toBlob && !options.disabled)) {
                    return data;
                }
                var file = data.files[data.index],
                    blob = new Blob([
                        data.imageHead,
                        // Resized images always have a head size of 20 bytes,
                        // including the JPEG marker and a minimal JFIF header:
                        this._blobSlice.call(file, 20)
                    ], {type: file.type});
                blob.name = file.name;
                data.files[data.index] = blob;
                return data;
            },

            // Sets the resized version of the image as a property of the
            // file object, must be called after "saveImage":
            setImage: function (data, options) {
                if (data.preview && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.preview;
                }
                return data;
            },

            deleteImageReferences: function (data, options) {
                if (!options.disabled) {
                    delete data.img;
                    delete data.canvas;
                    delete data.preview;
                    delete data.imageHead;
                }
                return data;
            }

        }

    });

}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fileupload-process"],e):e("object"==typeof exports?require("jquery"):window.jQuery)}(function(e){"use strict";e.blueimp.fileupload.prototype.options.processQueue.push({action:"validate",always:!0,acceptFileTypes:"@",maxFileSize:"@",minFileSize:"@",maxNumberOfFiles:"@",disabled:"@disableValidation"}),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{getNumberOfFiles:e.noop,messages:{maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small"}},processActions:{validate:function(i,r){if(r.disabled)return i;var l,s=e.Deferred(),t=this.options,o=i.files[i.index];return(r.minFileSize||r.maxFileSize)&&(l=o.size),"number"===e.type(r.maxNumberOfFiles)&&(t.getNumberOfFiles()||0)+i.files.length>r.maxNumberOfFiles?o.error=t.i18n("maxNumberOfFiles"):!r.acceptFileTypes||r.acceptFileTypes.test(o.type)||r.acceptFileTypes.test(o.name)?l>r.maxFileSize?o.error=t.i18n("maxFileSize"):"number"===e.type(l)&&l<r.minFileSize?o.error=t.i18n("minFileSize"):delete o.error:o.error=t.i18n("acceptFileTypes"),o.error||i.files.error?(i.files.error=!0,s.rejectWith(this,[i])):s.resolveWith(this,[i]),s.promise()}}})});
/*
 * jQuery File Upload Validation Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    // Append to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.push(
        {
            action: 'validate',
            // Always trigger this action,
            // even if the previous action was rejected:
            always: true,
            // Options taken from the global options map:
            acceptFileTypes: '@',
            maxFileSize: '@',
            minFileSize: '@',
            maxNumberOfFiles: '@',
            disabled: '@disableValidation'
        }
    );

    // The File Upload Validation plugin extends the fileupload widget
    // with file validation functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            /*
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // The maximum allowed file size in bytes:
            maxFileSize: 10000000, // 10 MB
            // The minimum allowed file size in bytes:
            minFileSize: undefined, // No minimal file size
            // The limit of files to be uploaded:
            maxNumberOfFiles: 10,
            */

            // Function returning the current number of files,
            // has to be overriden for maxNumberOfFiles validation:
            getNumberOfFiles: $.noop,

            // Error and info messages:
            messages: {
                maxNumberOfFiles: 'Maximum number of files exceeded',
                acceptFileTypes: 'File type not allowed',
                maxFileSize: 'File is too large',
                minFileSize: 'File is too small'
            }
        },

        processActions: {

            validate: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var dfd = $.Deferred(),
                    settings = this.options,
                    file = data.files[data.index],
                    fileSize;
                if (options.minFileSize || options.maxFileSize) {
                    fileSize = file.size;
                }
                if ($.type(options.maxNumberOfFiles) === 'number' &&
                        (settings.getNumberOfFiles() || 0) + data.files.length >
                            options.maxNumberOfFiles) {
                    file.error = settings.i18n('maxNumberOfFiles');
                } else if (options.acceptFileTypes &&
                        !(options.acceptFileTypes.test(file.type) ||
                        options.acceptFileTypes.test(file.name))) {
                    file.error = settings.i18n('acceptFileTypes');
                } else if (fileSize > options.maxFileSize) {
                    file.error = settings.i18n('maxFileSize');
                } else if ($.type(fileSize) === 'number' &&
                        fileSize < options.minFileSize) {
                    file.error = settings.i18n('minFileSize');
                } else {
                    delete file.error;
                }
                if (file.error || data.files.error) {
                    data.files.error = true;
                    dfd.rejectWith(this, [data]);
                } else {
                    dfd.resolveWith(this, [data]);
                }
                return dfd.promise();
            }

        }

    });

}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","tmpl","./jquery.fileupload-image","./jquery.fileupload-audio","./jquery.fileupload-video","./jquery.fileupload-validate"],e):"object"==typeof exports?e(require("jquery"),require("tmpl")):e(window.jQuery,window.tmpl)}(function(e,t){"use strict";e.blueimp.fileupload.prototype._specialOptions.push("filesContainer","uploadTemplateId","downloadTemplateId"),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{autoUpload:!1,uploadTemplateId:"template-upload",downloadTemplateId:"template-download",filesContainer:void 0,prependFiles:!1,dataType:"json",messages:{unknownError:"Unknown error"},getNumberOfFiles:function(){return this.filesContainer.children().not(".processing").length},getFilesFromResponse:function(t){return t.result&&e.isArray(t.result.files)?t.result.files:[]},add:function(t,i){if(t.isDefaultPrevented())return!1;var n=e(this),r=n.data("blueimp-fileupload")||n.data("fileupload"),o=r.options;i.context=r._renderUpload(i.files).data("data",i).addClass("processing"),o.filesContainer[o.prependFiles?"prepend":"append"](i.context),r._forceReflow(i.context),r._transition(i.context),i.process(function(){return n.fileupload("process",i)}).always(function(){i.context.each(function(t){e(this).find(".size").text(r._formatFileSize(i.files[t].size))}).removeClass("processing"),r._renderPreviews(i)}).done(function(){i.context.find(".start").prop("disabled",!1),r._trigger("added",t,i)!==!1&&(o.autoUpload||i.autoUpload)&&i.autoUpload!==!1&&i.submit()}).fail(function(){i.files.error&&i.context.each(function(t){var n=i.files[t].error;n&&e(this).find(".error").text(n)})})},send:function(t,i){if(t.isDefaultPrevented())return!1;var n=e(this).data("blueimp-fileupload")||e(this).data("fileupload");return i.context&&i.dataType&&"iframe"===i.dataType.substr(0,6)&&i.context.find(".progress").addClass(!e.support.transition&&"progress-animated").attr("aria-valuenow",100).children().first().css("width","100%"),n._trigger("sent",t,i)},done:function(t,i){if(t.isDefaultPrevented())return!1;var n,r,o=e(this).data("blueimp-fileupload")||e(this).data("fileupload"),a=i.getFilesFromResponse||o.options.getFilesFromResponse,s=a(i);i.context?i.context.each(function(a){var d=s[a]||{error:"Empty file upload result"};r=o._addFinishedDeferreds(),o._transition(e(this)).done(function(){var a=e(this);n=o._renderDownload([d]).replaceAll(a),o._forceReflow(n),o._transition(n).done(function(){i.context=e(this),o._trigger("completed",t,i),o._trigger("finished",t,i),r.resolve()})})}):(n=o._renderDownload(s)[o.options.prependFiles?"prependTo":"appendTo"](o.options.filesContainer),o._forceReflow(n),r=o._addFinishedDeferreds(),o._transition(n).done(function(){i.context=e(this),o._trigger("completed",t,i),o._trigger("finished",t,i),r.resolve()}))},fail:function(t,i){if(t.isDefaultPrevented())return!1;var n,r,o=e(this).data("blueimp-fileupload")||e(this).data("fileupload");i.context?i.context.each(function(a){if("abort"!==i.errorThrown){var s=i.files[a];s.error=s.error||i.errorThrown||i.i18n("unknownError"),r=o._addFinishedDeferreds(),o._transition(e(this)).done(function(){var a=e(this);n=o._renderDownload([s]).replaceAll(a),o._forceReflow(n),o._transition(n).done(function(){i.context=e(this),o._trigger("failed",t,i),o._trigger("finished",t,i),r.resolve()})})}else r=o._addFinishedDeferreds(),o._transition(e(this)).done(function(){e(this).remove(),o._trigger("failed",t,i),o._trigger("finished",t,i),r.resolve()})}):"abort"!==i.errorThrown?(i.context=o._renderUpload(i.files)[o.options.prependFiles?"prependTo":"appendTo"](o.options.filesContainer).data("data",i),o._forceReflow(i.context),r=o._addFinishedDeferreds(),o._transition(i.context).done(function(){i.context=e(this),o._trigger("failed",t,i),o._trigger("finished",t,i),r.resolve()})):(o._trigger("failed",t,i),o._trigger("finished",t,i),o._addFinishedDeferreds().resolve())},progress:function(t,i){if(t.isDefaultPrevented())return!1;var n=Math.floor(i.loaded/i.total*100);i.context&&i.context.each(function(){e(this).find(".progress").attr("aria-valuenow",n).children().first().css("width",n+"%")})},progressall:function(t,i){if(t.isDefaultPrevented())return!1;var n=e(this),r=Math.floor(i.loaded/i.total*100),o=n.find(".fileupload-progress"),a=o.find(".progress-extended");a.length&&a.html((n.data("blueimp-fileupload")||n.data("fileupload"))._renderExtendedProgress(i)),o.find(".progress").attr("aria-valuenow",r).children().first().css("width",r+"%")},start:function(t){if(t.isDefaultPrevented())return!1;var i=e(this).data("blueimp-fileupload")||e(this).data("fileupload");i._resetFinishedDeferreds(),i._transition(e(this).find(".fileupload-progress")).done(function(){i._trigger("started",t)})},stop:function(t){if(t.isDefaultPrevented())return!1;var i=e(this).data("blueimp-fileupload")||e(this).data("fileupload"),n=i._addFinishedDeferreds();e.when.apply(e,i._getFinishedDeferreds()).done(function(){i._trigger("stopped",t)}),i._transition(e(this).find(".fileupload-progress")).done(function(){e(this).find(".progress").attr("aria-valuenow","0").children().first().css("width","0%"),e(this).find(".progress-extended").html("&nbsp;"),n.resolve()})},processstart:function(t){return!t.isDefaultPrevented()&&void e(this).addClass("fileupload-processing")},processstop:function(t){return!t.isDefaultPrevented()&&void e(this).removeClass("fileupload-processing")},destroy:function(t,i){if(t.isDefaultPrevented())return!1;var n=e(this).data("blueimp-fileupload")||e(this).data("fileupload"),r=function(){n._transition(i.context).done(function(){e(this).remove(),n._trigger("destroyed",t,i)})};i.url?(i.dataType=i.dataType||n.options.dataType,e.ajax(i).done(r).fail(function(){n._trigger("destroyfailed",t,i)})):r()}},_resetFinishedDeferreds:function(){this._finishedUploads=[]},_addFinishedDeferreds:function(t){return t||(t=e.Deferred()),this._finishedUploads.push(t),t},_getFinishedDeferreds:function(){return this._finishedUploads},_enableDragToDesktop:function(){var t=e(this),i=t.prop("href"),n=t.prop("download"),r="application/octet-stream";t.bind("dragstart",function(e){try{e.originalEvent.dataTransfer.setData("DownloadURL",[r,n,i].join(":"))}catch(e){}})},_formatFileSize:function(e){return"number"!=typeof e?"":e>=1e9?(e/1e9).toFixed(2)+" GB":e>=1e6?(e/1e6).toFixed(2)+" MB":(e/1e3).toFixed(2)+" KB"},_formatBitrate:function(e){return"number"!=typeof e?"":e>=1e9?(e/1e9).toFixed(2)+" Gbit/s":e>=1e6?(e/1e6).toFixed(2)+" Mbit/s":e>=1e3?(e/1e3).toFixed(2)+" kbit/s":e.toFixed(2)+" bit/s"},_formatTime:function(e){var t=new Date(1e3*e),i=Math.floor(e/86400);return i=i?i+"d ":"",i+("0"+t.getUTCHours()).slice(-2)+":"+("0"+t.getUTCMinutes()).slice(-2)+":"+("0"+t.getUTCSeconds()).slice(-2)},_formatPercentage:function(e){return(100*e).toFixed(2)+" %"},_renderExtendedProgress:function(e){return this._formatBitrate(e.bitrate)+" | "+this._formatTime(8*(e.total-e.loaded)/e.bitrate)+" | "+this._formatPercentage(e.loaded/e.total)+" | "+this._formatFileSize(e.loaded)+" / "+this._formatFileSize(e.total)},_renderTemplate:function(t,i){if(!t)return e();var n=t({files:i,formatFileSize:this._formatFileSize,options:this.options});return n instanceof e?n:e(this.options.templatesContainer).html(n).children()},_renderPreviews:function(t){t.context.find(".preview").each(function(i,n){e(n).append(t.files[i].preview)})},_renderUpload:function(e){return this._renderTemplate(this.options.uploadTemplate,e)},_renderDownload:function(e){return this._renderTemplate(this.options.downloadTemplate,e).find("a[download]").each(this._enableDragToDesktop).end()},_startHandler:function(t){t.preventDefault();var i=e(t.currentTarget),n=i.closest(".template-upload"),r=n.data("data");i.prop("disabled",!0),r&&r.submit&&r.submit()},_cancelHandler:function(t){t.preventDefault();var i=e(t.currentTarget).closest(".template-upload,.template-download"),n=i.data("data")||{};n.context=n.context||i,n.abort?n.abort():(n.errorThrown="abort",this._trigger("fail",t,n))},_deleteHandler:function(t){t.preventDefault();var i=e(t.currentTarget);this._trigger("destroy",t,e.extend({context:i.closest(".template-download"),type:"DELETE"},i.data()))},_forceReflow:function(t){return e.support.transition&&t.length&&t[0].offsetWidth},_transition:function(t){var i=e.Deferred();return e.support.transition&&t.hasClass("fade")&&t.is(":visible")?t.bind(e.support.transition.end,function(n){n.target===t[0]&&(t.unbind(e.support.transition.end),i.resolveWith(t))}).toggleClass("in"):(t.toggleClass("in"),i.resolveWith(t)),i},_initButtonBarEventHandlers:function(){var t=this.element.find(".fileupload-buttonbar"),i=this.options.filesContainer;this._on(t.find(".start"),{click:function(e){e.preventDefault(),i.find(".start").click()}}),this._on(t.find(".cancel"),{click:function(e){e.preventDefault(),i.find(".cancel").click()}}),this._on(t.find(".delete"),{click:function(e){e.preventDefault(),i.find(".toggle:checked").closest(".template-download").find(".delete").click(),t.find(".toggle").prop("checked",!1)}}),this._on(t.find(".toggle"),{change:function(t){i.find(".toggle").prop("checked",e(t.currentTarget).is(":checked"))}})},_destroyButtonBarEventHandlers:function(){this._off(this.element.find(".fileupload-buttonbar").find(".start, .cancel, .delete"),"click"),this._off(this.element.find(".fileupload-buttonbar .toggle"),"change.")},_initEventHandlers:function(){this._super(),this._on(this.options.filesContainer,{"click .start":this._startHandler,"click .cancel":this._cancelHandler,"click .delete":this._deleteHandler}),this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){this._destroyButtonBarEventHandlers(),this._off(this.options.filesContainer,"click"),this._super()},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!1).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!0).parent().addClass("disabled")},_initTemplates:function(){var e=this.options;e.templatesContainer=this.document[0].createElement(e.filesContainer.prop("nodeName")),t&&(e.uploadTemplateId&&(e.uploadTemplate=t(e.uploadTemplateId)),e.downloadTemplateId&&(e.downloadTemplate=t(e.downloadTemplateId)))},_initFilesContainer:function(){var t=this.options;void 0===t.filesContainer?t.filesContainer=this.element.find(".files"):t.filesContainer instanceof e||(t.filesContainer=e(t.filesContainer))},_initSpecialOptions:function(){this._super(),this._initFilesContainer(),this._initTemplates()},_create:function(){this._super(),this._resetFinishedDeferreds(),e.support.fileInput||this._disableFileInputButton()},enable:function(){var e=!1;this.options.disabled&&(e=!0),this._super(),e&&(this.element.find("input, button").prop("disabled",!1),this._enableFileInputButton())},disable:function(){this.options.disabled||(this.element.find("input, button").prop("disabled",!0),this._disableFileInputButton()),this._super()}})});
/*
 * jQuery File Upload User Interface Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            './jquery.fileupload-image',
            './jquery.fileupload-audio',
            './jquery.fileupload-video',
            './jquery.fileupload-validate'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('tmpl')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl
        );
    }
}(function ($, tmpl) {
    'use strict';

    $.blueimp.fileupload.prototype._specialOptions.push(
        'filesContainer',
        'uploadTemplateId',
        'downloadTemplateId'
    );

    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            downloadTemplateId: 'template-download',
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // Error and info messages:
            messages: {
                unknownError: 'Unknown error'
            },

            // Function returning the current number of files,
            // used by the maxNumberOfFiles validation:
            getNumberOfFiles: function () {
                return this.filesContainer.children()
                    .not('.processing').length;
            },

            // Callback to retrieve the list of files from the server response:
            getFilesFromResponse: function (data) {
                if (data.result && $.isArray(data.result.files)) {
                    return data.result.files;
                }
                return [];
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    that = $this.data('blueimp-fileupload') ||
                        $this.data('fileupload'),
                    options = that.options;
                data.context = that._renderUpload(data.files)
                    .data('data', data)
                    .addClass('processing');
                options.filesContainer[
                    options.prependFiles ? 'prepend' : 'append'
                ](data.context);
                that._forceReflow(data.context);
                that._transition(data.context);
                data.process(function () {
                    return $this.fileupload('process', data);
                }).always(function () {
                    data.context.each(function (index) {
                        $(this).find('.size').text(
                            that._formatFileSize(data.files[index].size)
                        );
                    }).removeClass('processing');
                    that._renderPreviews(data);
                }).done(function () {
                    data.context.find('.start').prop('disabled', false);
                    if ((that._trigger('added', e, data) !== false) &&
                            (options.autoUpload || data.autoUpload) &&
                            data.autoUpload !== false) {
                        data.submit();
                    }
                }).fail(function () {
                    if (data.files.error) {
                        data.context.each(function (index) {
                            var error = data.files[index].error;
                            if (error) {
                                $(this).find('.error').text(error);
                            }
                        });
                    }
                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .children().first().css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    getFilesFromResponse = data.getFilesFromResponse ||
                        that.options.getFilesFromResponse,
                    files = getFilesFromResponse(data),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        var file = files[index] ||
                                {error: 'Empty file upload result'};
                        deferred = that._addFinishedDeferreds();
                        that._transition($(this)).done(
                            function () {
                                var node = $(this);
                                template = that._renderDownload([file])
                                    .replaceAll(node);
                                that._forceReflow(template);
                                that._transition(template).done(
                                    function () {
                                        data.context = $(this);
                                        that._trigger('completed', e, data);
                                        that._trigger('finished', e, data);
                                        deferred.resolve();
                                    }
                                );
                            }
                        );
                    });
                } else {
                    template = that._renderDownload(files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer);
                    that._forceReflow(template);
                    deferred = that._addFinishedDeferreds();
                    that._transition(template).done(
                        function () {
                            data.context = $(this);
                            that._trigger('completed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                data.i18n('unknownError');
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                            that._trigger('finished', e, data);
                                            deferred.resolve();
                                        }
                                    );
                                }
                            );
                        } else {
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                    that._trigger('finished', e, data);
                                    deferred.resolve();
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    deferred = that._addFinishedDeferreds();
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                    that._trigger('finished', e, data);
                    that._addFinishedDeferreds().resolve();
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var progress = Math.floor(data.loaded / data.total * 100);
                if (data.context) {
                    data.context.each(function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', progress)
                            .children().first().css(
                                'width',
                                progress + '%'
                            );
                    });
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    progress = Math.floor(data.loaded / data.total * 100),
                    globalProgressNode = $this.find('.fileupload-progress'),
                    extendedProgressNode = globalProgressNode
                        .find('.progress-extended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        ($this.data('blueimp-fileupload') || $this.data('fileupload'))
                            ._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .children().first().css(
                        'width',
                        progress + '%'
                    );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                that._resetFinishedDeferreds();
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    deferred = that._addFinishedDeferreds();
                $.when.apply($, that._getFinishedDeferreds())
                    .done(function () {
                        that._trigger('stopped', e);
                    });
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', '0')
                            .children().first().css('width', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        deferred.resolve();
                    }
                );
            },
            processstart: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).addClass('fileupload-processing');
            },
            processstop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).removeClass('fileupload-processing');
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    removeNode = function () {
                        that._transition(data.context).done(
                            function () {
                                $(this).remove();
                                that._trigger('destroyed', e, data);
                            }
                        );
                    };
                if (data.url) {
                    data.dataType = data.dataType || that.options.dataType;
                    $.ajax(data).done(removeNode).fail(function () {
                        that._trigger('destroyfailed', e, data);
                    });
                } else {
                    removeNode();
                }
            }
        },

        _resetFinishedDeferreds: function () {
            this._finishedUploads = [];
        },

        _addFinishedDeferreds: function (deferred) {
            if (!deferred) {
                deferred = $.Deferred();
            }
            this._finishedUploads.push(deferred);
            return deferred;
        },

        _getFinishedDeferreds: function () {
            return this._finishedUploads;
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (ignore) {}
            });
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits.toFixed(2) + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = Math.floor(seconds / 86400);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreviews: function (data) {
            data.context.find('.preview').each(function (index, elm) {
                $(elm).append(data.files[index].preview);
            });
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest('.template-upload'),
                data = template.data('data');
            button.prop('disabled', true);
            if (data && data.submit) {
                data.submit();
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(e.currentTarget)
                    .closest('.template-upload,.template-download'),
                data = template.data('data') || {};
            data.context = data.context || template;
            if (data.abort) {
                data.abort();
            } else {
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
            }
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget);
            this._trigger('destroy', e, $.extend({
                context: button.closest('.template-download'),
                type: 'DELETE'
            }, button.data()));
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade') && node.is(':visible')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },

        _initButtonBarEventHandlers: function () {
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer;
            this._on(fileUploadButtonBar.find('.start'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.start').click();
                }
            });
            this._on(fileUploadButtonBar.find('.cancel'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.cancel').click();
                }
            });
            this._on(fileUploadButtonBar.find('.delete'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.toggle:checked')
                        .closest('.template-download')
                        .find('.delete').click();
                    fileUploadButtonBar.find('.toggle')
                        .prop('checked', false);
                }
            });
            this._on(fileUploadButtonBar.find('.toggle'), {
                change: function (e) {
                    filesList.find('.toggle').prop(
                        'checked',
                        $(e.currentTarget).is(':checked')
                    );
                }
            });
        },

        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('.fileupload-buttonbar')
                    .find('.start, .cancel, .delete'),
                'click'
            );
            this._off(
                this.element.find('.fileupload-buttonbar .toggle'),
                'change.'
            );
        },

        _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                'click .start': this._startHandler,
                'click .cancel': this._cancelHandler,
                'click .delete': this._deleteHandler
            });
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = this.document[0].createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _initSpecialOptions: function () {
            this._super();
            this._initFilesContainer();
            this._initTemplates();
        },

        _create: function () {
            this._super();
            this._resetFinishedDeferreds();
            if (!$.support.fileInput) {
                this._disableFileInputButton();
            }
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            this._super();
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            this._super();
        }

    });

}));

function build_chunks(){$.getJSON("chunk-listing").done(function(e){0==e.length?$("#upload-chunks-listing").append("<span>").addClass("discreet").text("There are no partially uploaded files."):($("#upload-chunks-listing").html("<ul>"),$("#upload-chunks-listing ul").attr("id","chunked_listing"),$.each(e,function(e,t){link=$("<a>").attr("href",t.url).addClass("contenttype-"+t.portal_type.toLowerCase()),linktext=$("<span>").text(t.title),link.append(linktext),descriptor=$("<span>").text(t.percent+" of "+t.size+" completed").addClass("chunksize_descriptor"),linkblock=$("<span>").append(link).append("[ ").append(descriptor).append(" ]").append(" &mdash; created on "+t.date),delbutton=$("<a>").attr("href",t.url+"/@@delete?_authenticator="+$("#_authenticator").val()).text("Delete").addClass("btn btn-danger delete"),$("#can_delete")?listitem=$("<li>").append(delbutton).append(" ").append(linkblock):listitem=$("<li>").append(linkblock),$("#upload-chunks-listing ul").append(listitem)}))})}function refreshlisting(){$("#upload-marker")&&(build_chunks(),$("#upload-folder-listing").load("@@unchunk-listing",function(e,t,n){"error"==t&&$("#upload-chunks-listing").html("Error updating content listing: "+n.status+": "+n.statusText)}),refresh_buttons())}function refresh_buttons(){$("#files div").length>0?($("#files div button").length>0?$("#uploadAll").show():$("#uploadAll").hide(),$("#clearAll").show()):($("#uploadAll").hide(),$("#clearAll").hide())}function printable_size(e){return e=parseFloat(e),0==e?"0 B":(prefixes=["B","KB","MB","GB","TB","PB"],tens=Math.floor(Math.log(e)/Math.log(1024)),e/=Math.pow(1024,tens),tens<prefixes.length?e.toFixed(2)+" "+prefixes[tens]:e.toFixed(2)+e*Math.pow(1024,tens)+" B")}function abortize(e,t){e.off("click").text("Abort").on("click",function(){uploaded=t._progress.loaded,e.closest("p").find("img").remove(),t.abort(),resumify(e,t,uploaded)})}function xhr_support(){var e=new XMLHttpRequest;return!!(e&&"upload"in e&&"onprogress"in e.upload)}function resumify(e,t){e.off("click").text("Resume").removeClass("singular").prop("disabled",!1).on("click",function(){e.text("Processing..."),chunk_name=get_chunk_for_file(t.files[0].name)||t.files[0].name+"_chunk",$.getJSON(chunk_name+"/chunk-check").done(function(n){t.uploadedBytes=n.uploadedBytes,t.submit(),e.parent().find(".glyphicon").remove(),e.parent().find(':contains("File upload")').remove(),abortize(e,t)})})}function get_current_files(){var e=new Array;for(contents=$("#upload-folder-listing a"),i=0;i<contents.length;i++)e.push($(contents[i]).text());return e}function get_chunk_for_file(e){for(contents=$("#upload-chunks-listing a"),i=0;i<contents.length;i++){var t=$(contents[i]).attr("href");if(t.split("/").pop()==e+"_chunk")return t}}function update_progress(e){var t=parseInt(e.loaded/e.total*100,10);$("#progress .progress-bar").css("width",t+"%"),$("#progress .progress-bar").html("&nbsp;"+t+"%")}$(document).ready(function(){$("#uploadAll").click(function(){$("#files button.singular").click()}),$("#clearAll").click(function(){$("#files div button").each(function(){var e=$(this),t=e.data();abortize(e,t)}),$("#files div").remove(),$("#progress .progress-bar").css("width","0%"),$("#progress .progress-bar").text(""),refreshlisting()}),$(document).bind("dragover",function(e){var t=$("#dropzone"),n=window.dropZoneTimeout;n?clearTimeout(n):t.addClass("in");var a=!1,i=e.target;do{if(i===t[0]){a=!0;break}i=i.parentNode}while(null!=i);a?t.addClass("hover"):t.removeClass("hover"),window.dropZoneTimeout=setTimeout(function(){window.dropZoneTimeout=null,t.removeClass("in hover")},100)}),refresh_buttons()}),$(function(){"use strict";var e="@@upload-chunk",t=$("<button/>").addClass("btn btn-primary singular").text("Upload").on("click",function(){var e=$(this),t=e.data();abortize(e,t),t.submit()}),n=$("<button/>").addClass("btn btn-warning").text("Clear").click(function(){var e=$(this),t=e.data();e.closest("div").remove(),t.abort(),refreshlisting(),update_progress(t)});$("<img>").attr("src","++plone++static/select2-spinner.gif").addClass("upload-spinner");$("#fileupload").fileupload({url:e,formData:{_authenticator:$("#_authenticator").val()},dataType:"json",dropZone:$("#dropzone"),autoUpload:!1,maxChunkSize:parseInt($("#chunksize").attr("data")),disableImageResize:/Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),previewMaxWidth:100,previewMaxHeight:100,previewCrop:!0}).on("fileuploadadd",function(e,a){a.context=$("<div/>").appendTo("#files"),$.each(a.files,function(e,i){var r=i.name;i.size&&(r+=" - "+printable_size(i.size));var o=$("<p/>").append($("<span/>").text(r));e||(o.append("<br>").append(t.clone(!0).data(a)).append(" ").append(n.clone(!0).data(a)),get_chunk_for_file(i.name)?$.getJSON(i.name+"_chunk/chunk-check").done(function(t){a.uploadedBytes=t.uploadedBytes,a.files[e].size&&a.files[e].size!=t.targetsize&&(alert("Partially uploaded file size ("+printable_size(t.targetsize)+") does not match size of selected file ("+printable_size(a.files[e].size)+"). Upload aborted."),a.abort(),o.remove());var n=(t.uploadedBytes/t.targetsize*100).toFixed(2);resumify(o.find(".btn-primary.singular"),a),o.append($('<span class="text-danger"/>').text(" A file with this name is "+n+"% uploaded."))}):$.inArray(i.name,get_current_files())!=-1&&o.append($('<span class="text-danger"/>').text(" WARNING - file already exists and will be overwritten"))),o.appendTo(a.context)}),refresh_buttons()}).on("fileuploadprocessalways",function(e,t){var n=t.index,a=t.files[n],i=$(t.context.children()[n]);a.preview&&i.prepend("<br>").prepend(a.preview),a.error&&i.append($('<span class="text-danger file-fail"/>').text(a.error)),n+1===t.files.length&&t.context.find("button.singular").text("Upload").prop("disabled",!!t.files.error)}).on("fileuploadprogressall",function(e,t){update_progress(t)}).on("fileuploaddone",function(e,t){$.each(t.result.files,function(e,n){if($(t.context.children()[e]).find("img").remove(),n.url){var a=$("<a>").attr("target","_blank").prop("href",n.url+"/view"),i=$(t.context.children()[e]);i.find(".text-danger").remove(),i.find("span").before('<span class="success glyphicon glyphicon-ok"/> '),i.find("button").remove(),i.wrap(a),i.hide("slow",function(){i.remove()})}else if(n.error){var r=$('<span class="text-danger"/>').text(n.error);$(t.context.children()[e]).append("<br>").append(r)}}),refreshlisting()}).on("fileuploadfail",function(e,t){$.each(t.files,function(e,n){var a="File upload failed. An unknown error has occurred.",i=$("#mailto").val();if(xhr_support())switch(t.jqXHR.status){case 504:a="The uploaded file is still processing and is taking longer than expected.  This happens with very large files.  Please check back in a few minutes by refreshing the page.";break;case 500:a='An unexpected error has occurred.  Please contact the administrator at <a href="mailto:'+i+'">'+i+"</a>.";break;case 0:a="File upload aborted.";break;default:a="File upload failed. Server response: "+t.jqXHR.status+" - "+t.jqXHR.statusText}var r=$('<span class="text-danger"/>').html(a),o=t._progress.loaded,s=$(t.context.children()[e]);t.abort(),resumify(s.find(".btn-primary"),t,o),refreshlisting(),$(t.context.children()[e]).append("<br>").append('<span class="warning glyphicon glyphicon-remove"/> ').append(r)})}).prop("disabled",!$.support.fileInput).parent().addClass($.support.fileInput?void 0:"disabled")});
function build_chunks() {
  // build an unordered list from the json data
  // this is a listing of all incomplete upload chunks
  $.getJSON('chunk-listing').done(function(result) {
    if (result.length == 0) {
      $('#upload-chunks-listing').append('<span>')
                                 .addClass('discreet')
                                 .text('There are no partially uploaded files.')
    }
    else {
      $('#upload-chunks-listing').html('<ul>');
      $('#upload-chunks-listing ul').attr('id','chunked_listing');

      $.each(result, function(index,chunk) {
        link = $('<a>')
                     .attr('href',chunk.url)
                     .addClass('contenttype-'+chunk.portal_type.toLowerCase())
        linktext = $('<span>').text(chunk.title)
        link.append(linktext);
        descriptor = $('<span>').text(chunk.percent + ' of ' + chunk.size + ' completed')
                                .addClass('chunksize_descriptor')
        linkblock = $('<span>').append(link)
                               .append('[ ')
                               .append(descriptor)
                               .append(' ]')
                               .append(' &mdash; created on ' + chunk.date)
        delbutton = $('<a>').attr('href',chunk.url+'/@@delete?_authenticator='+$('#_authenticator').val())
                            .text('Delete')
                            .addClass('btn btn-danger delete');
        if ($('#can_delete')) {
          listitem = $('<li>').append(delbutton)
                              .append(' ')
                              .append(linkblock);
        }
        else {
          listitem = $('<li>').append(linkblock);
        }
        $('#upload-chunks-listing ul').append(listitem)
      });
    }
  });
}

function refreshlisting() {
  if ( $('#upload-marker') ) {

    // build listing of partial uploads, build listing of completed uploads, toggle upload/cancel all buttons
    build_chunks();
    $("#upload-folder-listing").load("@@unchunk-listing",function(responseTxt,statusTxt,xhr){
      if(statusTxt=="error")
        $('#upload-chunks-listing').html("Error updating content listing: "+xhr.status+": "+xhr.statusText);
    });
    refresh_buttons();
  }
}

function refresh_buttons() {
  if ( $('#files div').length > 0 ) {
    // if it doesn't have a button it's completed - only show the clear button
    if ( $('#files div button').length > 0 ) {
      $('#uploadAll').show();
    }
    else {
      $('#uploadAll').hide();
    }
    $('#clearAll').show();
  }
  else {
    $('#uploadAll').hide();
    $('#clearAll').hide();
  }
}

function printable_size(fsize) {
  fsize = parseFloat(fsize);
  if (fsize == 0) {
    return '0 B'
  }
  prefixes = ['B','KB','MB','GB','TB','PB']
  tens = Math.floor(Math.log(fsize)/Math.log(1024))
  fsize = fsize/Math.pow(1024,tens)
  if (tens < prefixes.length) {
    return fsize.toFixed(2) + ' ' + prefixes[tens]
  }
  else { // uhhhh, we should never have a file this big
    return fsize.toFixed(2) + fsize * Math.pow(1024,tens) + ' B'
  }
}

function abortize(ele,data) {
  // replace a button with an abort function
  ele.off('click')
    .text('Abort')
    .on('click', function () {
        uploaded = data._progress.loaded;
        ele.closest('p').find('img').remove();
        data.abort();
        resumify(ele,data,uploaded);
    });
}

function xhr_support() {
  var xhr = new XMLHttpRequest();
  return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
}

function resumify(ele,data) {
  // replace a button with a resume function
  ele.off('click')
    .text('Resume')
    .removeClass('singular')
    .prop('disabled',false)
    .on('click', function () {
      // get the starting size when we hit click, so we can resume on that byte
      ele.text('Processing...')
      chunk_name = get_chunk_for_file(data.files[0].name) || data.files[0].name + '_chunk'
      $.getJSON(chunk_name+'/chunk-check').done(function(result) {
        data.uploadedBytes = result.uploadedBytes;
        data.submit();
        ele.parent().find('.glyphicon').remove();               // remove x-icon
        ele.parent().find(':contains("File upload")').remove(); // remove error text
        abortize(ele,data);
      });
    });
}

function get_current_files() {
  // get all completed files
  var filenames = new Array();
  contents = $('#upload-folder-listing a')
  for (i=0;i<contents.length;i++) {
    filenames.push($(contents[i]).text());
  };
  return filenames;
}

function get_chunk_for_file(file_name) {
  // for a given file name, see if we have a partially uploaded version
  contents = $('#upload-chunks-listing a')
  for (i=0;i<contents.length;i++) {
    var full_url = $(contents[i]).attr('href');
    if(full_url.split('/').pop() == file_name + '_chunk') {
      return full_url;
    }
  };
}

function update_progress(data) {
  // update the progress bar
  var progress = parseInt(data.loaded / data.total * 100, 10);
  $('#progress .progress-bar').css(
      'width',
      progress + '%'
  );
  $('#progress .progress-bar').html('&nbsp;' + progress + '%');
}

$(document).ready(function() {
    // assign event for upload all
    $('#uploadAll').click(function() {
      $('#files button.singular').click();
    });

    // assign event for clear all
    $('#clearAll').click(function() {
      $('#files div button').each(function (){
        var $this = $(this),
            data = $this.data();
        abortize($this,data);
      });
      $('#files div').remove();
      $('#progress .progress-bar').css('width','0%');
      $('#progress .progress-bar').text('');
      refreshlisting();
    });

    $(document).bind('dragover', function (e) {
        var dropZone = $('#dropzone'),
            timeout = window.dropZoneTimeout;
        if (!timeout) {
            dropZone.addClass('in');
        } else {
            clearTimeout(timeout);
        }
        var found = false,
            node = e.target;
        do {
            if (node === dropZone[0]) {
                found = true;
                break;
            }
            node = node.parentNode;
        } while (node != null);
        if (found) {
            dropZone.addClass('hover');
        } else {
            dropZone.removeClass('hover');
        }
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
        }, 100);
    });
    refresh_buttons(); // initial button load
});

$(function () {
    // wrap in anonymous function
    'use strict';
    var url = '@@upload-chunk',
        // upload button to be added to individual files
        uploadButton = $('<button/>')
            .addClass('btn btn-primary singular')
            .text('Upload')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                abortize($this, data);
                data.submit();
            }),
        // cancel button to be added to individual files
        cancelButton = $('<button/>')
            .addClass('btn btn-warning')
            .text('Clear')
            .click(function () {
              var $this = $(this),
                  data = $this.data();
              $this.closest('div').remove();
              data.abort();
              refreshlisting();
              update_progress(data);
            }),
        spinner = $('<img>')
          .attr('src','++plone++static/select2-spinner.gif')
          .addClass('upload-spinner');

    $('#fileupload').fileupload({
        // main fileupload
        url: url,
        formData: {'_authenticator': $('#_authenticator').val()},
        dataType: 'json',
        dropZone: $('#dropzone'),
        autoUpload: false,
        maxChunkSize: parseInt($('#chunksize').attr('data')),
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        // add file event
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var file_text = file.name;
            if (file.size) {
              file_text += ' - ' + printable_size(file.size)
            }
            var node = $('<p/>')
                    .append($('<span/>').text(file_text));
            if (!index) {
                // add buttons
                node.append('<br>')
                    .append(uploadButton.clone(true).data(data))
                    .append(' ')
                    .append(cancelButton.clone(true).data(data));
                // check if we have a partially uploaded file of the same name
                if (get_chunk_for_file(file.name)) {
                  $.getJSON(file.name+'_chunk/chunk-check').done(function(result) {
                    data.uploadedBytes = result.uploadedBytes;
                    // check size of the file to be uploaded against file on server's intended size
                    if (data.files[index].size && data.files[index].size != result.targetsize) { // check doesn't work on IE9, which has no file size
                      alert('Partially uploaded file size (' + printable_size(result.targetsize) + ') does not match size of selected file (' + printable_size(data.files[index].size) + ')' + '. Upload aborted.');
                      data.abort();
                      node.remove();
                      // return null;
                    }
                    var percent_complete = (result.uploadedBytes/result.targetsize*100).toFixed(2)
                    resumify(node.find('.btn-primary.singular'),data);
                    node.append($('<span class="text-danger"/>').text(' A file with this name is ' + percent_complete + '% uploaded.'));
                  });
                }
                // check if we have a completed upload of the same name
                else if ($.inArray(file.name,get_current_files()) != -1) {
                  node.append($('<span class="text-danger"/>').text(' WARNING - file already exists and will be overwritten'));
                }
            }
            node.appendTo(data.context);
        });
        refresh_buttons();
    }).on('fileuploadprocessalways', function (e, data) {
        // process always event
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append($('<span class="text-danger file-fail"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button.singular')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        // progress all event
        update_progress(data);
    }).on('fileuploaddone', function (e, data) {
        // upload done event
        $.each(data.result.files, function (index, file) {
            $(data.context.children()[index]).find('img').remove();
            if (file.url) {
               var link = $('<a>')
                   .attr('target', '_blank')
                   .prop('href', file.url+'/view');
               var child = $(data.context.children()[index]);
               child.find('.text-danger').remove(); // remove any old warning about duplicate files
               child.find('span').before('<span class="success glyphicon glyphicon-ok"/> '); // add ok icon
               child.find('button').remove(); // remove submit/clear buttons
               child.wrap(link);
               child.hide('slow', function(){ child.remove(); });
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
        refreshlisting();
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error_text = 'File upload failed. An unknown error has occurred.',
                mailto = $('#mailto').val();
            if (xhr_support()) {
              switch(data.jqXHR.status) {
                  case 504:
                      error_text = 'The uploaded file is still processing and is taking longer than expected.  This happens with very large files.  Please check back in a few minutes by refreshing the page.'
                      break;
                  case 500:
                      error_text = 'An unexpected error has occurred.  Please contact the administrator at <a href="mailto:' + mailto + '">' + mailto + '</a>.'
                      break;
                  case 0:
                      error_text = 'File upload aborted.'
                      break;
                  default:
                      error_text = 'File upload failed. Server response: ' + data.jqXHR.status + ' - ' + data.jqXHR.statusText;
              }
            }
            var error = $('<span class="text-danger"/>').html(error_text),
                uploaded = data._progress.loaded,
                ele = $(data.context.children()[index]);
            data.abort();
            resumify(ele.find('.btn-primary'),data,uploaded);
            refreshlisting();
            $(data.context.children()[index])
                .append('<br>')
                .append('<span class="warning glyphicon glyphicon-remove"/> ')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

