const express = require('express');

const router = express.Router();

const controller = require('../controller/checkout.controller');

router.get('/',  controller.index);
router.post('/',  controller.postPayment)
module.exports = router;