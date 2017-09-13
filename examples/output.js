var fs               = require('fs');
var PdfPrinter       = require('pdfmake/src/printer');
var contentStateData = require('../resources/contentStateData.json');
var StateToPdfMake   = require('../lib/stateToPdfMake');

var fonts = {
  Roboto: {
    normal: 'examples/fonts/Roboto-Regular.ttf',
    bold: 'examples/fonts/Roboto-Medium.ttf',
    italics: 'examples/fonts/Roboto-Italic.ttf',
    bolditalics: 'examples/fonts/Roboto-MediumItalic.ttf'
  }
};

var stateToPdfMake  = new StateToPdfMake(contentStateData);
var pdfmakeContents = stateToPdfMake.generate();

var printer = new PdfPrinter(fonts);
var pdfDoc  = printer.createPdfKitDocument(pdfmakeContents);

pdfDoc.pipe(fs.createWriteStream('./examples/output.pdf'));
pdfDoc.end();
