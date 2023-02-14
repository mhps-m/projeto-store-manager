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

module.exports = {
  insert,
};