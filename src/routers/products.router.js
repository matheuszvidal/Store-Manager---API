const express = require('express');
const { productsController } = require('../controllers');

const validateNewProductField = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProduct);
router.put('/:id', validateNewProductField, productsController.updateProduct);
router.post('/', validateNewProductField, productsController.createProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
