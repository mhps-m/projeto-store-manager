const HttpError = require('http-errors');
const { productsModel } = require('../models/index');
const schemas = require('./validations/validateInputs');

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

const insert = async (product) => {
  schemas.validateProductName(product);

  const newProductId = await productsModel.insert(product.name);

  const newProduct = await findById(newProductId);

  return newProduct;
};

const update = async (product, productId) => {
  schemas.validateProductName(product);

  await findById(productId);

  await productsModel.update(product.name, productId);

  const updatedProduct = await findById(productId);

  return updatedProduct;
};

const remove = async (productId) => {
  await findById(productId);

  return productsModel.remove(productId);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};