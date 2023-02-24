const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const newProductSchema = Joi.object({
  name: nameSchema.required(),
}).required();

const saleDetailsSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}).required();

module.exports = {
  nameSchema,
  newProductSchema,
  saleDetailsSchema,
};