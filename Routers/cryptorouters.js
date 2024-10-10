const express = require('express');
const router = express.Router();

const cryptoController = require('../Controller/cryptoController');

router.get('/status', cryptoController.statusController);
router.get('/deviation',cryptoController.deviationController);
module.exports = router;