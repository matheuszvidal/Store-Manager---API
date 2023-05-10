const express = require('express');
const { salesController } = require('../controllers');

// const validateNewProductField = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.createSaleProduct);

module.exports = router;