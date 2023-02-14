const HttpError = require('http-errors');
const { productsModel } = require('../models/index');

const findAll = async () => {
  const products = await productsModel.findAll();

  if (!products.length) throw new HttpError(404, 'No products found');
  
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) throw new HttpError(404, 'Product not found');
  
  return product;
};

const insert = async (productName) => {
  const newProductId = await productsModel.insert(productName);

  const newProduct = await productsModel.findById(newProductId);

  return newProduct;
};

module.exports = {
  findAll,
  findById,
  insert,
};