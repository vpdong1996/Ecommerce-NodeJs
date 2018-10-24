const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    image: String,
    description: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;