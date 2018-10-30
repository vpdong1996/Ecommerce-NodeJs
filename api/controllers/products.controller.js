const Product = require('../../models/product.model');

module.exports.getProduct = async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
}
module.exports.viewProduct = async (req, res, next) => {
    const id = req.params.id;
    const products = await Product.find({_id: id});
    res.json(products);
}