const router = require('express').Router();
const {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getSingleProduct
} = require('../controllers/productController');


router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/single/:id', getSingleProduct);
router.get('/all', getAllProduct);

module.exports = router;