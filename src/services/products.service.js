const errors = require('restify-errors');
const { productsModel } = require('../models/index');

const findAll = async () => {
  const products = await productsModel.findAll();

  if (!products.length) throw new errors.NotFoundError('No products found');
  
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) throw new errors.NotFoundError('Product not found');
  
  return product;
};

module.exports = {
  findAll,
  findById,
};