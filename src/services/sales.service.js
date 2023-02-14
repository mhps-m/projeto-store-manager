const HttpError = require('http-errors');
const { salesModel, salesProductsModel } = require('../models');
const productsService = require('./products.service');
const schemas = require('./validations/validateInputs');

const insert = async (saleDetails) => {
  const validation = schemas.validateNewSale(saleDetails);

  if (HttpError.isHttpError(validation)) throw validation;

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

module.exports = {
  insert,
  findAll,
  findById,
};