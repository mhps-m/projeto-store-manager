const HttpError = require('http-errors');
const schemas = require('./schemas');

const validateProductName = (productName) => {
  if (!productName) return new HttpError(400, '"name" is required');
  
  const validation = schemas.newProductSchema.validate({ name: productName });

  if (validation.error) return new HttpError(422, validation.error.message);
};

module.exports = {
  validateProductName,
};