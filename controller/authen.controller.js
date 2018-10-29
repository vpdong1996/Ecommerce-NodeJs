
const cookieParser = require('cookie-parser');
const User = require('../models/user.model');

const md5 = require('md5');

module.exports.login = (req, res) => {
    const successMsg = req.flash('success')[0];
    
    res.render('authen/login', {
        title: 'Login',
        successMsg
    });
};
module.exports.postLogin = (req, res) => {
    res.redirect('/contact');
}
module.exports.signup = (req, res, next) => {
    const errorMsg = req.flash('error')[0];
    res.render('authen/signup', {
        title: 'Sign Up',
        errorMsg
    });
};
module.exports.postSignup = async (req, res,  next) => {
    const email = await User.findOne({email : req.body.email});
    const name = await User.findOne({email : req.body.name});

    if(email){
        req.flash('error', "Email is already in use. Please try with a diffirent Email!");
        return res.redirect('/authen/signup');
    }
    if(name){
        req.flash('error', "Name is already in use. Please try with a diffirent Name!");
        return res.redirect('/authen/signup');
    }
    const newUser = new User({
        email: req.body.email,
        password: md5(req.body.password),
        name: req.body.name

    });
    await newUser.save();
    req.flash('success', "Successfully Create an Account. Please login!");
    res.redirect('/authen/login');
}