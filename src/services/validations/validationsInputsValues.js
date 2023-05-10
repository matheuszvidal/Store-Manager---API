const { idSchema, addProductSchema, addArraySaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProduct = (product) => {
  const { error } = addProductSchema.validate(product);
  if (error) {
    if (error.message.includes('"name" is required')) {
      return { type: 'FIELD_INVALID', message: error.message };
    }
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

const validateSale = (sale) => {
  const { error } = addArraySaleSchema.validate(sale);
  if (error) {
    const validation = error.message.includes('"productId" is required')
      || error.message.includes('"quantity" is required');
    if (validation) {
      return { type: 'FIELD_INVALID', message: error.message };
    }
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
  validateSale,
};
