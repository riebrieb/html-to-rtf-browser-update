const Rtf = require('./src/rtf/rtf.class');
const htmlToRtf = new Rtf();
const charset = require('./src/rtf/charset.module');
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, '/files/input.html'), 'utf8');

charset.forEach(c =>
    html = html.replace(new RegExp(c.htmlEntity, 'g'), c.rtfEscapeChar)
);

htmlToRtf.saveRtfInFile(path.join(__dirname, '../../RDP/olar.rtf'), htmlToRtf.convertHtmlToRtf(html));
