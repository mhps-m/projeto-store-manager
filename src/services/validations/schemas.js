const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const newProductSchema = Joi.object({
  name: nameSchema,
});

module.exports = {
  nameSchema,
  newProductSchema,
};