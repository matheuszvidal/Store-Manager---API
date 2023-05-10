const { productsModel } = require('../models');
const schema = require('./validations/validationsInputsValues');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const error = schema.validateProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insert(product);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, productNameUpdate) => {
  const { type, message } = await getById(productId);
  if (type) return { type, message };

  const error = schema.validateProduct(productNameUpdate);
  if (error.type) return error;

  await productsModel.updateProduct(productId, productNameUpdate);
  const nameUpdated = await getById(productId);

  return { type: null, message: nameUpdated.message };
};

const deleteProduct = async (productId) => {
  const { type, message } = await getById(productId);
  if (type) return { type, message };

  await productsModel.deleteProduct(productId);

  return { type: null };
};

// const app = async () => {
//   const a = await deleteProduct(2);
//   console.log(a.message);
// };
// app();

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
