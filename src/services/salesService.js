const schema = require('./validations/validationsInputsValues');
const { salesModel, productsModel } = require('../models');

const createSale = async (productSale) => {
  const error = schema.validateSale(productSale);
  if (error.type) return error;
  
  const products = await productsModel.getAll();
  const productExist = productSale.every((product) => products.some((p) =>
    product.productId === p.id));
  if (!productExist) return ({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

  const insertId = await salesModel.insertSale();

  await Promise.all(await productSale.map(async (product) =>
    salesModel.insertSaleProduct(insertId, product)));
  return { type: null, message: { id: insertId, itemsSold: productSale } };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.getSaleById(saleId);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};