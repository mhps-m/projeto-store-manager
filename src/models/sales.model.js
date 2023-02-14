const camelize = require('camelize');
const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
       p.sale_id, s.date, p.product_id, p.quantity
     FROM 
       StoreManager.sales AS s
     LEFT JOIN
       StoreManager.sales_products AS p
     ON
       s.id = p.sale_id
     ORDER BY
       s.id, p.product_id
     ;`,
  );

  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
       s.date, p.product_id, p.quantity
     FROM 
       StoreManager.sales AS s
     LEFT JOIN
       StoreManager.sales_products AS p
     ON
       s.id = p.sale_id
     WHERE
       s.id = ?
     ;`,
    [id],
  );

  return camelize(result);
};

module.exports = {
  insert,
  findAll,
  findById,
};