const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async (insertId, productSale) => {
  const { productId, quantity } = productSale;
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [insertId, productId, quantity],
  );
  return affectedRows;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity, sp.sale_id
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id`,
  );

  const sales = result.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return sales;
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    ` SELECT s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE s.id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
    [saleId],
  );

  const sale = result.map((s) => ({
    date: s.date,
    productId: s.product_id,
    quantity: s.quantity,
  }));

  return sale;
};

const deleteSale = async (saleId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return result;
};

module.exports = {
  insertSale,
  insertSaleProduct,
  getAllSales,
  getSaleById,
};