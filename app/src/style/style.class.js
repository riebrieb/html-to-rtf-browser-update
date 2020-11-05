const cheerio   = require('cheerio');
const $         = cheerio.load('');
const Color     = require('../color/color.class');
const Sources   = require('../sources/sources.class');
const AllowedStyleProperties = require('../allowed-style-properties/allowed-style-properties.class');

class Style {

  static getRtfColorTable() {
    return Color.getRtfColorTable();
  }

  static getRtfSourceReference(value) {
    return Sources.getRtfSourcesReference(value);
  }

    static getRtfReferencesInStyleProperty(styleValue) {
        if (styleValue === '') {
            return undefined;
        }

        let fictitiousTagWithTruthStyle = `<span style="${styleValue}"></span>`;
        let listOfRtfReferences = '';
        let allowedTags = AllowedStyleProperties.getAllowedTags();

        allowedTags.forEach(value => {
            if ($(fictitiousTagWithTruthStyle).css(value.propertyName) !== undefined) {
                if (value.transform !== undefined) {
                    const styleTag = value.getSpecificStyleTag !== undefined ?
                        value.getSpecificStyleTag(styleValue) :
                        fictitiousTagWithTruthStyle;
                    listOfRtfReferences += value.transform($(styleTag).css(value.propertyName));;
                }
            }
        });

        if (listOfRtfReferences === '') {
            return undefined;
        }

        return listOfRtfReferences;
    }
}

module.exports = Style;
