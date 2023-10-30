const Product = require('../models/BlockchainProduct');
const barcodeGenerator = require('../utils/barcodeGenerator');
const { v4: uuidv4 } = require('uuid');

const createProduct = async (req, res, next) => {
    try {
        const {
            productName, description, category, brand, price, weight,
            origin, vendorName, vendorCode, address, phone,
            compilanceCertificate, safetyInfo, manufacturingDate, expirationDate
        } = req.body;

        let serialNumber;
        if (req.body.serialNumber) {
            serialNumber = req.body.serialNumber;
        } else {
            let id = uuidv4();
            let arr = id.split('-');
            serialNumber = arr[arr.length - 1];
        }

        // const barcodeImageBuffer = barcodeGenerator(serialNumber);

        const productImg = 'https://static.ohsogo.com/media/catalog/product/cache/e8e097f5396d8dde6be5d5b8f2e70ffa/c/l/clear-cool-sport-menthol_180ml_fop.jpg';

        const newProductObj = {
            basicDetails: {
                productName, description, category, brand,
                price, weight, productImg, origin
            },
            tracking: {
                barcode: "barcodeImageBuffer.toString('base64')",
                serialNumber
            },
            vendorDetails: {
                vendorName, vendorCode,
                vendorContactInfo: {
                    address, phone
                }
            },
            expiration: {
                manufacturingDate, expirationDate
            },
            compilanceInfo: {
                compilanceCertificate, safetyInfo
            }
        }

        const newProduct = new Product(newProductObj);
        const product = await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (err) {
        next(err);
    }
}

const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.updateMany(
            { serialNumber: id },
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.deleteOne({ serialNumber: id });
        res.status(200).json({
            success: true,
            message: "Product has been deleted!"
        });
    } catch (err) {
        next(err);
    }
}

const getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ 'tracking.serialNumber': id });

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        next(err);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getSingleProduct
}
