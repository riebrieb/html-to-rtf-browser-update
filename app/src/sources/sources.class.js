const MyString = require('../string/my-string.class');

const imgMap = {
    'png': '\\pngblip\\',
    'jpg': '\\jpegblip\\',
    'jpeg': '\\jpegblip\\',
    'bmp': '\\wbitmap0\\picw6400\\pich4260\\wbmbitspixel1\\wbmplanes1\\wbmwidthbytes220'
}

class Sources {
  static getRtfSourcesReference(value) {
      const imgType = MyString.findTextBetween(value, 'data:image/', ';' ) || '';
      const buffer = new Buffer( value.replace( 'data:image/'+ imgType + ';base64,', '' ), 'base64' );
      return imgMap[imgType.toLowerCase()] + ' ' + buffer.toString('hex');
  }
}

module.exports = Sources;
