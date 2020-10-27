const cheerio   = require('cheerio');
const $         = cheerio.load('');
const Color     = require('../color/color.class');
const Alignment = require('../alignment/alignment.class');
const FontSize  = require('../font-size/font-size.class');
const Sources   = require('../sources/sources.class');
const FontFamily = require('../font-family/font-family.class');
const TextIndent = require('../text-indent/text-indent.class');
const AllowedStyleProperties = require('../allowed-style-properties/allowed-style-properties.class');

class Style {
  static getRtfReferenceColor(value) {
    return Color.getRtfReferenceColor(value);
  }

  static getRtfColorTable() {
    return Color.getRtfColorTable();
  }

  static getRtfAlignmentReference(value) {
    return Alignment.getRtfAlignmentReference(value);
  }

    static getRtfFontFamilyReference(value) {
        return FontFamily.getRtfFontFamilyReference(value);
    }

  static getRtfFontSizeReference(value) {
    return FontSize.getRtfFontSizeReference(value);
  }

  static getRtfSourceReference(value) {
    return Sources.getRtfSourcesReference(value);
  }

  static getRtfReferencesInStyleProperty(styleValue) {
        if (styleValue == '') {
      return undefined;
        }

        let fictitiousTagWithTruthStyle = `<span style="${styleValue}"></span>`;
    let listOfRtfReferences = '';
        let allowedTags = AllowedStyleProperties.getAllowedTags();

        allowedTags.forEach(value => {
      if($(fictitiousTagWithTruthStyle).css(value.propertyName) != undefined) {
        switch(value.propertyName) {
                    case 'color':
                        listOfRtfReferences += this.getRtfReferenceColor($(fictitiousTagWithTruthStyle).css(value.propertyName));
                        break;
                    case 'font-size':
                        listOfRtfReferences += this.getRtfFontSizeReference($(fictitiousTagWithTruthStyle).css(value.propertyName));
                        break;
                    case 'font-family':
                        let _fictitiousTagWithTruthStyle = `<span style="${
                            styleValue.replace(new RegExp('\'', 'g'), '').split(',')[0]
                        }"></span>`;

                        listOfRtfReferences += this.getRtfFontFamilyReference($(_fictitiousTagWithTruthStyle).css(value.propertyName));
                        break;
                    case 'text-align':
                        listOfRtfReferences += this.getRtfAlignmentReference($(fictitiousTagWithTruthStyle).css(value.propertyName));
                        break;
            case "text-indent":
                listOfRtfReferences += TextIndent.getRtfReference($(fictitiousTagWithTruthStyle).css(value.propertyName));
                break;
            default:
                        break;
        }
      }
    });

        if (listOfRtfReferences == '') {
      return undefined;
        }

    return listOfRtfReferences;
  }
}

module.exports = Style;
