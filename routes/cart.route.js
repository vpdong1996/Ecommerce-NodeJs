const express = require('express');

const router = express.Router();

const controller = require('../controller/cart.controller');

router.get('/', controller.checkout);
router.get('/add/:productId', controller.addToCart);
router.get('/remove/:productId', controller.deleteItemCart)
module.exports = router;