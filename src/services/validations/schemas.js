const Joi = require('joi');

const nameSchema = Joi.string().min(5);

const newProductSchema = Joi.object({
  name: nameSchema,
});

const newSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}));

module.exports = {
  nameSchema,
  newProductSchema,
  newSaleSchema,
};