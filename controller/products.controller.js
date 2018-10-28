
const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
    // Sử Dụng Promise ***
    // Product.find().then(products => {
    //     res.render('products/index', {
    //         products
    //     })
    // })
    // Sử dụng Async Await ****
    
    const productsLength = await Product.countDocuments();
    const page = parseInt(req.query.page) || 1;
    const perpage = 6;
    const begin = (page - 1) * perpage;
    const end = begin + perpage;
    const products = await Product.find().skip(begin).limit(perpage);
    res.render('products/index', {
        title : 'Products Page',
        products,
        currentPage: page,
        productsLength : Math.ceil(productsLength/perpage)
    });
};
module.exports.search = async (req, res) => {
    const p = req.query.p;
    const products = await Product.find();
    const page = parseInt(req.query.page) || 1;
    const perpage = 6;
    const begin = (page - 1) * perpage;
    const end = begin + perpage;
    const matchProduct =  products.filter((product) => {
        return product.name.toLowerCase().indexOf(p.toLowerCase()) !== -1;
    })
    const productsLength = matchProduct.length;
    res.render('products/index', {
        products: matchProduct.slice(begin, end),
        currentPage: page,
        productsLength: Math.ceil(productsLength/perpage),
        searchParams : p
    });
}
module.exports.viewProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({_id: id});
    res.render('products/details', {
        product
    })
}