const { productsService } = require('../services/index');

const findAll = async (_req, res) => {
  const products = await productsService.findAll();
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const productId = req.params.id;

  const product = await productsService.findById(productId);

  res.status(200).json(product);
};

const insert = async (req, res) => {
  const productName = req.body.name;

  const newProduct = await productsService.insert(productName);

  res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const productId = req.params.id;

  const productName = req.body.name;

  const updatedProduct = await productsService.update(productName, productId);

  res.status(200).json(updatedProduct);
};

const remove = async (req, res) => {
  const productId = req.params.id;

  await productsService.remove(productId);

  res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};