const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', productsController.insert);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.remove);

module.exports = router;