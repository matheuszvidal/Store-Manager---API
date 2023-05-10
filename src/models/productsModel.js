const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const [key] = Object.keys(product);
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${key}) VALUE (?)`,
    [product.name],
  );
  return insertId;
};

const updateProduct = async (productId, productNameUpdate) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productNameUpdate.name, productId],
  );

  return affectedRows;
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  insert,
  updateProduct,
  deleteProduct,
};
