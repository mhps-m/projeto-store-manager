const { salesService } = require('../services');

const insert = async (req, res) => {
  const saleDetails = req.body;

  const newSale = await salesService.insert(saleDetails);

  res.status(201).json(newSale);
};

const findAll = async (_req, res) => {
  const sales = await salesService.findAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const saleId = req.params.id;

  const sale = await salesService.findById(saleId);

  res.status(200).json(sale);
};

const remove = async (req, res) => {
  const saleId = req.params.id;

  await salesService.remove(saleId);

  res.status(204).json();
};

const update = async (req, res) => {
  const updateDetails = req.body;
  const saleId = req.params.id;

  const updatedSale = await salesService.update(saleId, updateDetails);

  res.status(200).json(updatedSale);
};

module.exports = {
  insert,
  findAll,
  findById,
  remove,
  update,
};