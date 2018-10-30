const express = require('express');

const router = express.Router();

const controller = require('../controller/checkout.controller');
const validate = require('../validate/authen.validate');

router.get('/',validate.checkOut, controller.index);
router.post('/',validate.checkOut, controller.postPayment)
module.exports = router;