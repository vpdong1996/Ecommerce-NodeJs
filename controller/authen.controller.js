
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
    if(req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }
    else {
        res.redirect('/contact');
    }
    
}
module.exports.signup = (req, res, next) => {
    const errorMsg = req.flash('error')[0];
    res.render('authen/signup', {
        title: 'Sign Up',
        errorMsg
    });
};
module.exports.postSignup = async (req, res,  next) => {
    const newUser = new User({
        email: req.body.email,
        password: md5(req.body.password),
        name: req.body.name
    });
    await newUser.save();
    req.flash('success', "Successfully Create an Account. Please login!");
    if(req.session.oldUrl) {
        res.redirect(req.session.oldUrl);
        req.session.oldUrl = null;
    }
    else {
        res.redirect('/authen/login');
    }
   
}
module.exports.logOut = (req, res, next) => {
    delete req.session.userId;
    delete req.session.user;
    res.redirect('/');
}