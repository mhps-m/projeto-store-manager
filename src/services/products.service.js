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

const insert = async (productName) => {
  const validation = schemas.validateProductName(productName);

  if (HttpError.isHttpError(validation)) throw validation;

  const newProductId = await productsModel.insert(productName);

  const newProduct = await findById(newProductId);

  return newProduct;
};

const update = async (productName, productId) => {
  const validation = schemas.validateProductName(productName);

  if (HttpError.isHttpError(validation)) throw validation;

  await findById(productId);

  await productsModel.update(productName, productId);

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