const HttpError = require('http-errors');
const schemas = require('./schemas');

const validateProductName = (productName) => {
  if (!productName) return new HttpError(400, '"name" is required');
  
  const validation = schemas.newProductSchema.validate(productName);

  if (validation.error) throw new HttpError(422, validation.error.message);
};

const validateProductSold = (productSold) => {
  const validation = schemas.saleDetailsSchema.validate(productSold);

  if (validation.error) {
    // const newErrorMessage = `"${(validation.error.message.split('.'))[1]}`;
    const errorStatusCode = validation.error.message.includes('is required') ? 400 : 422;
    throw new HttpError(errorStatusCode, validation.error.message);
  }
};

const validateSaleDetails = (sale) => {
  if (!Array.isArray(sale) || !sale.length) {
    throw new HttpError(400, 'Body must be an array of objects');
  }

  sale.map((productSold) => validateProductSold(productSold));
};

module.exports = {
  validateProductName,
  validateSaleDetails,
};