const connection = require('./connection');

const insert = async (saleId, productId, quantity) => (
  connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
     VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  )
);

const remove = async (saleId) => (
  connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
    [saleId],
  )
);

module.exports = {
  insert,
  remove,
};