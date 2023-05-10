const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSaleProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await salesService.createSale(product);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSaleProduct,
  listSales,
  getSale,
};