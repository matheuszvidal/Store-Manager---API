const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.getAll();
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.createProduct(product);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const name = req.body;

  const { type, message } = await productsService.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
