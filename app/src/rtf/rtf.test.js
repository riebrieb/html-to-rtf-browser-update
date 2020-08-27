const should = require('should');
const Rtf = require('./rtf.class');
const Style = require('../style/style.class');
const Color = require('../color/color.class');
const fs = require('fs');
const path = require('path');
const charset = require('../../src/rtf/charset.module');

describe('RtfTest', () => {
    it('convertHtmlToRtf()', () => {
        let rtf = new Rtf();
        let rtfTest = fs.readFileSync(path.join(__dirname, '/../../files/output.rtf'), 'utf8');
        let html = fs.readFileSync(path.join(__dirname, '/../../files/input.html'), 'utf8');

        charset.forEach(c =>
            html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
        );

        // should(rtf.convertHtmlToRtf(html)).be.equal(rtfTest);
    });

    it('buildRtf()', () => {
        let rtf = new Rtf();

        Color.cleanColorTable();
        rtf.addOpeningTagInRtfCode('b');
        rtf.addContentOfTagInRtfCode('test test test test');
        rtf.addClosingFatherTagInRtfCode('b');

        should(rtf.buildRtf()).be.equal('{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}{\\f1\\fnil\\fcharset0 Arial Black;}{\\f2\\fnil\\fcharset0 Courier New;}{\\f3\\fnil\\fcharset0 Georgia;}{\\f4\\fnil\\fcharset0 Tahoma;}{\\f5\\fnil\\fcharset0 Times New Roman;}{\\f6\\fnil\\fcharset0 Verdana;}}{\\colortbl ;}{\\b test test test test}}');
    });

    it('getRtfContentReferences()', () => {
        let rtf = new Rtf();

        rtf.addOpeningTagInRtfCode('b');
        rtf.addContentOfTagInRtfCode('test test test test');
        rtf.addClosingFatherTagInRtfCode('b');

        should(rtf.getRtfContentReferences()).be.equal('{\\b test test test test}');
    });

    it('getAmountOfColumnThroughOfFirstChildOfTbodyTag()', () => {
        let rtf = new Rtf();
        let tableChildren = [
            { name: 'thead' },
            {
                name: 'tbody',
                children: [
                    {
                        type: 'tr',
                        children: [
                            { type: 'tag' },
                            { type: 'tag' },
                            { type: 'tag' },
                            { type: 'text' }
                        ]
                    }
                ]
            }
        ];

        should(rtf.getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren)).be.equal(3);
    });

    it('ifExistsAttributesAddAllReferencesInRtfCode()', () => {
        let rtf = new Rtf();
        let atributes = {};

        atributes.style = 'background: #333; color: #333; margin: 5px; text-align: center; padding: 2px;';
        rtf.ifExistsAttributesAddAllReferencesInRtfCode(atributes);

        should(rtf.getRtfContentReferences()).be.equal('\\cf1\\qc');
    });

    it('addReferenceTagInRtfCode()', () => {
        let rtf = new Rtf();

        rtf.addOpeningTagInRtfCode('ll');
        rtf.addClosingFatherTagInRtfCode('ll');
        rtf.addOpeningTagInRtfCode('dd');
        rtf.addClosingFatherTagInRtfCode('dd');
        rtf.addOpeningTagInRtfCode('form');
        rtf.addClosingFatherTagInRtfCode('form');

        should(rtf.rtfContentReferences).be.length(0);
    });

    it('addOpeningTagInRtfCode()', () => {
        let rtf = new Rtf();

        rtf.addOpeningTagInRtfCode('p');

        should(rtf.rtfContentReferences[0].content).be.equal('{\\pard');
        should(rtf.rtfContentReferences[0].tag).be.true();
    });

    it('addClosingFatherTagInRtfCode()', () => {
        let rtf = new Rtf();

        rtf.addClosingFatherTagInRtfCode('p');

        should(rtf.rtfContentReferences[0].content).be.equal('\\sb70\\par}');
        should(rtf.rtfContentReferences[0].tag).be.true();
    });

    it('addContentOfTagInRtfCode()', () => {
        let rtf = new Rtf();

        rtf.addContentOfTagInRtfCode('string of test');
        should(rtf.rtfContentReferences[0].content).be.equal(' string of test');
        should(rtf.rtfContentReferences[0].tag).be.false();

        rtf.addContentOfTagInRtfCode('string \nof test\t');
        should(rtf.rtfContentReferences[1].content).be.equal(' string of test');
        should(rtf.rtfContentReferences[1].tag).be.false();
    });
});
