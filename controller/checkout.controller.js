const Cart = require('../models/cart.model');

module.exports.index = (req, res) => {
    // if (!req.session.cart) {
    //     return res.redirect('/cart')
    // }
    if (!req.signedCookies.userId){
        res.redirect('/authen/login');
        return;
    }
    const cart = new Cart(req.session.cart);
    const errMsg = req.flash('error')[0];
    res.render('cart/payment', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        errMsg,
        noErrors : !errMsg,
        title: 'Payments'
    });
};
module.exports.postPayment = (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/cart')
    }
    const cart = new Cart(req.session.cart);
    const stripe = require("stripe")("sk_test_8HT4PKspFFUE5DxKtqbovt1s");

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test charge for dongkg3876@example.com"
    }, function (err, charge) {
        // asynchronously called
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/payment');
        }

        req.flash('success', "Successfully bought product!");
        req.session.cart = null;
        res.redirect('/cart');        
    });
}