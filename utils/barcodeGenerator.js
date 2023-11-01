const JsBarcode = require('jsbarcode');
const { createCanvas } = require("canvas");

const barcodeGenerator = (serialNumber) => {
    const canvas = createCanvas();

    JsBarcode(canvas, serialNumber, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 16,
    });

    const barcodeImageBuffer = canvas.toBuffer();
    return barcodeImageBuffer;
}

module.exports = barcodeGenerator;