const { salesService } = require('../services');

const insert = async (req, res) => {
  const saleDetails = req.body;

  const newSale = await salesService.insert(saleDetails);

  res.status(201).json(newSale);
};

module.exports = {
  insert,
};