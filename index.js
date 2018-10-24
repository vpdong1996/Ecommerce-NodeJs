require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const userRoute = require('./routes/user.route');
const productsRoute = require('./routes/products.route');
const authenRoute = require('./routes/authen.route');
const cartRoute = require('./routes/cart.route');
const checkoutRoute = require('./routes/checkout.route');
const Product = require('./models/product.model');

const authenMiddle = require('./middlewares/authen.middleware');
// const sessionMiddle = require('./middlewares/session.middleware');


const port = process.env.PORT || 3000;
const app = express();



app.set('view engine', 'pug');
app.set('views', './views');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_COOKIE));
app.use(session({
    secret: 'mysupersecrect',
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 180*60*1000}
}));



app.use(express.static('public'))

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
})
app.get('/', async function(req, res) {
    const products = await Product.find().skip(0).limit(3);
    res.render('index', {
        products,
        title : 'Homepage'
    });
});
app.use('/contact', authenMiddle.requireAuthen, userRoute);
app.use('/authen/', authenRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/payment', checkoutRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})