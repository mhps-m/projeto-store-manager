const HttpError = require('http-errors');
const { salesModel, salesProductsModel } = require('../models');
const productsService = require('./products.service');
const schemas = require('./validations/validateInputs');

const insert = async (saleDetails) => {
  schemas.validateSaleDetails(saleDetails);

  await Promise.all(
    saleDetails.map((productDetails) => productsService.findById(productDetails.productId)),
  );

  const newSaleId = await salesModel.insert();

  await Promise.all(
    saleDetails.map((productDetails) => {
      const { productId, quantity } = productDetails;
      return salesProductsModel.insert(newSaleId, productId, quantity);
    }),
  );

  const newSale = {
    id: newSaleId,
    itemsSold: [...saleDetails],
  };

  return newSale;
};

const findAll = async () => {
  const sales = await salesModel.findAll();

  if (!sales.length) throw new HttpError(404, 'No sales found');

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale.length) throw new HttpError(404, 'Sale not found');

  return sale;
};

const remove = async (id) => {
  await findById(id);

  await salesModel.remove(id);
};

const update = async (saleId, updateDetails) => {
  schemas.validateSaleDetails(updateDetails);

  await Promise.all(
    updateDetails.map((productDetails) => productsService.findById(productDetails.productId)),
  );

  await findById(saleId);

  await salesProductsModel.remove(saleId);

  await Promise.all(
    updateDetails.map((productDetails) => {
      const { productId, quantity } = productDetails;
      return salesProductsModel.insert(saleId, productId, quantity); 
    }),
  );

  const updatedSale = {
    saleId,
    itemsUpdated: [...updateDetails],
  };

  return updatedSale;
};

module.exports = {
  insert,
  findAll,
  findById,
  remove,
  update,
};