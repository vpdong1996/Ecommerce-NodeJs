const Cart = require('../models/cart.model');

module.exports.index = (req, res) => {
    if (!req.session.cart) {
        return res.render('cart/index', {
            products : null
        })
    }
    const cart = new Cart(req.session.cart);

    res.render('cart/payment', {
        products : cart.generateArray(),
        totalPrice : cart.totalPrice
    });
};