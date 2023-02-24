const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.insert);

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.delete('/:id', salesController.remove);

router.put('/:id', salesController.update);

module.exports = router;