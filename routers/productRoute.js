const router = require('express').Router();
const {
    createProduct,
    deleteProduct,
    updateProduct,
    undoProduct,
    getAllProduct,
    getSingleProduct
} = require('../controllers/productController');


router.post('/create', createProduct);
router.put('/:id', updateProduct);
router.put('/undo/:id', undoProduct);
router.delete('/:id', deleteProduct);
router.get('/single/:id', getSingleProduct);
router.get('/all', getAllProduct);

module.exports = router;