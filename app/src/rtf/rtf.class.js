const cheerio = require('cheerio');
const Style = require('../style/style.class');
const AllowedHtmlTags = require('../allowed-html-tags/allowed-html-tags.class');
const Table = require('../table/table.class');
const MyString = require('../string/my-string.class');
const juice = require('juice');
const fs = require('fs');
const charset = require('./charset.module');

class Rtf {
    constructor() {
        this.rtfHeaderOpening = '{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}{\\f1\\fnil\\fcharset0 Arial Black;}{\\f2\\fnil\\fcharset0 Courier New;}{\\f3\\fnil\\fcharset0 Georgia;}{\\f4\\fnil\\fcharset0 Tahoma;}{\\f5\\fnil\\fcharset0 Times New Roman;}{\\f6\\fnil\\fcharset0 Verdana;}}';
        this.rtfHeaderContent = '';
        this.rtfClosing = '}';
        this.rtfContentReferences = [];
        this.Table = new Table();
    }

    convertHtmlToRtf(html) {
        charset.forEach(c =>
            html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
        );

        let $ = cheerio.load(juice(html));
        let treeOfTags = $('html').children();

        Array.from(treeOfTags).forEach(tag => this.readAllChildsInTag(tag));

        return this.buildRtf();
    }

    buildRtf() {
        this.rtfHeaderContent += Style.getRtfColorTable();

        let content = (
            this.rtfHeaderOpening +
            this.rtfHeaderContent +
            this.getRtfContentReferences() +
            this.rtfClosing
        );

        this.clearCacheContent();

        return content;
    }

    getRtfContentReferences() {
        let rtfReference = '';

        this.rtfContentReferences.forEach(
            value => rtfReference += value.content
        );

        return rtfReference;
    }

    // Don't has a test
    readAllChildsInTag(parentTag) {
        if (parentTag.children != undefined) {
            this.addOpeningTagInRtfCode(parentTag.name);
            this.ifExistsAttributesAddAllReferencesInRtfCode(parentTag.attribs);

            if (parentTag.name.toLowerCase() == 'table') {
                this.Table.setAmountOfColumns(this.getAmountOfColumnThroughOfFirstChildOfTbodyTag(parentTag.children));
            }

            if (parentTag.name.toLowerCase() == 'tr') {
                this.addReferenceTagInRtfCode(this.Table.buildCellsLengthOfEachColumn());
            }

            if (parentTag.name.toLowerCase() == 'mark') {
                this.setHighlightInRtf();
            }

            (parentTag.children).forEach((child, index) => {
                if (child.type != 'text') {
                    this.readAllChildsInTag(child);
                } else {
                    this.addContentOfTagInRtfCode(child.data);
                }
            });
        }

        this.addClosingFatherTagInRtfCode(parentTag.name);
    }

    getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren) {
        let count = 0;
        let tbodyIndex = tableChildren.findIndex(value => value.name == 'tbody');

        for (let i = 0; i < tableChildren[tbodyIndex].children.length; i++) {
            if (tableChildren[tbodyIndex].children[i].type != 'text') {
                (tableChildren[tbodyIndex].children[i].children).forEach((child, index) => {
                    if (child.type != 'text') {
                        count++;
                    }
                });

                break;
            }
        }

        return count;
    }

    ifExistsAttributesAddAllReferencesInRtfCode(attributes) {
        if (attributes.style != undefined) {
            this.addReferenceTagInRtfCode(Style.getRtfReferencesInStyleProperty(attributes.style));
        }

        if (attributes.align != undefined) {
            this.addReferenceTagInRtfCode(Style.getRtfAlignmentReference(attributes.align));
        }
    }

    addReferenceTagInRtfCode(referenceTag) {
        if (referenceTag != undefined) {
            this.rtfContentReferences.push({
                content: referenceTag,
                tag: true
            });
        }
    }

    addOpeningTagInRtfCode(tag) {
        this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(tag));
    }

    addClosingFatherTagInRtfCode(closingFatherTag) {
        this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(`/${closingFatherTag}`));
    }

    addContentOfTagInRtfCode(contentOfTag) {
        contentOfTag = MyString.removeCharacterOfEscapeInAllString(contentOfTag, '\n\t');

        if (contentOfTag != undefined && !MyString.hasOnlyWhiteSpace(contentOfTag))
            this.rtfContentReferences.push({
                content: this.addSpaceAroundString(contentOfTag.trim()),
                tag: false
            });
    }

    addSpaceAroundString(contentOfTag) {
        return ` ${contentOfTag} `;
    }

    setHighlightInRtf() {
        let rtfReferenceColor = Style.getRtfReferenceColor('rgb(255, 255, 0)');
        let referenceColorNumber = rtfReferenceColor.match(/[0-9]+/);

        this.addReferenceTagInRtfCode('\\highlight' + referenceColorNumber.toString());
    }

    saveRtfInFile(path, value) {
        fs.writeFile(path, value, err => {
            if (err) {
                throw err;
            }

            console.log('The file has been saved!');
        });
    }

    clearCacheContent() {
        this.rtfHeaderContent = '';
        this.rtfContentReferences = [];
    }
}

module.exports = Rtf;
