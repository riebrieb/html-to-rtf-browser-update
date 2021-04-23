const MyString = require('../string/my-string.class');
const Style = require('../style/style.class');
const Indentation = require('../indentation/indentation.class');

const IMG_MAP = {
    'png': '\\pngblip',
    'jpg': '\\jpegblip',
    'jpeg': '\\jpegblip',
    'bmp': '\\wbitmap0\\picw6400\\pich4260\\wbmbitspixel1\\wbmplanes1\\wbmwidthbytes220'
}

class Sources {
  static getRtfSourcesReference(src, style) {
      const width =  Sources.getStyleInImgTag(style, 'width');
      const height =  Sources.getStyleInImgTag(style, 'height');
      let sizeStyle = width > 0 ? '\\picwgoal' + width : '';
      sizeStyle += height > 0 ? '\\pichgoal' + height : '';
      console.info(sizeStyle)
      const imgType = MyString.findTextBetween(src, 'data:image/', ';' ) || '';
      const buffer = new Buffer( src.replace( 'data:image/'+ imgType + ';base64,', '' ), 'base64' );
      return IMG_MAP[imgType.toLowerCase()] + sizeStyle + ' ' + buffer.toString('hex');
  }

  static getStyleInImgTag( style, property ) {
      if ( style ) {
          const value = Style.getStyleValueOfProperty( style, property) || '0';
          const multiplier = Indentation.getMultiplier( value ) || 0;
          return Math.trunc(parseFloat(value) * multiplier);
      }
  }
}

module.exports = Sources;
