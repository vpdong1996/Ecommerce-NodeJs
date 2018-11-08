require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const userRoute = require('./routes/user.route');
const productsRoute = require('./routes/products.route');
const authenRoute = require('./routes/authen.route');
const cartRoute = require('./routes/cart.route');
const checkoutRoute = require('./routes/checkout.route');

const Product = require('./models/product.model');

//API 
const apiProductRoute = require('./api/routes/products.route');

const authenMiddle = require('./middlewares/authen.middleware');
const authenValidate = require('./validate/authen.validate');
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
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
})
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))



app.get('/', async function(req, res) {
    const products = await Product.find().skip(17).limit(3);
    res.render('index', {
        products,
        title : 'Homepage'
    });
});
app.get('/about', (req, res ,next) => {
    res.render('about', {
        title: "About Us"
    })
})
app.use('/contact', authenMiddle.requireAuthen, userRoute);
app.use('/authen/', authenRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/payment', authenMiddle.requireAuthen, checkoutRoute);
app.use('/api/products', apiProductRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})