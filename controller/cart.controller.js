
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.addToCart = (req, res, next) => {
    const productId = req.params.productId;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.direct('/products');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/products');
    })

};
module.exports.checkout = (req, res, next) => {
    if (!req.session.cart) {
        const successMsg = req.flash('success')[0];
        return res.render('cart/index', {
            successMsg,
            title: 'Shopping-Cart'
        });
    }

    const cart = new Cart(req.session.cart);
    const successMsg = req.flash('success')[0];
    res.render('cart/index', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        title: 'Shopping-Cart',
        successMsg
    })
}
module.exports.deleteItemCart = (req, res, next) => {
    const id = req.params.productId;
    let cart = new Cart(req.session.cart);
    const productIndex = cart.generateArray().findIndex(product => product.item._id === id);
    for (let idItem in cart.items) {
        if (idItem === id) {
            cart.totalQuantity -= cart.items[id].quantity;
            cart.totalPrice -= cart.items[id].price;
            delete cart.items[id];
            req.session.cart = cart;
            
            if (req.session.cart.totalQuantity === 0) {
                req.session.destroy(() => {
                    return res.redirect('/cart')
                });
            }
        }
    }
}