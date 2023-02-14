const HttpError = require('http-errors');
const schemas = require('./schemas');

const validateProductName = (productName) => {
  if (!productName) return new HttpError(400, '"name" is required');
  
  const validation = schemas.newProductSchema.validate({ name: productName });

  if (validation.error) return new HttpError(422, validation.error.message);
};

const validateNewSale = (saleDetails) => {
  const validation = schemas.newSaleSchema.validate(saleDetails);

  if (validation.error) {
    const newErrorMessage = `"${(validation.error.message.split('.'))[1]}`;
    const errorStatusCode = validation.error.message.includes('is required') ? 400 : 422;
    return new HttpError(errorStatusCode, newErrorMessage);
  }
};

module.exports = {
  validateProductName,
  validateNewSale,
};