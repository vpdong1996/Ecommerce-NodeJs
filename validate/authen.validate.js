const md5 = require('md5');
const User = require('../models/user.model');

module.exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email
    });

    if (!user) {
        res.render('authen/login', {
            errors: [
                'User doesnt exist '
            ],
            values: req.body
        });
        return;
    }
    if (md5(password) !== user.password) {
        res.render('authen/login', {
            errors: [
                'Password is wrong or missing'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    next();
}
module.exports.postSignUp = async (req, res, next) => {
    const email = await User.findOne({ email: req.body.email });
    const name = await User.findOne({ email: req.body.name });
    if (!req.body.email) {
        req.flash('error', "Email is empty!");
        return res.redirect('/authen/signup');
    }
    if (email) {
        req.flash('error', "Email is already in use. Please try with a diffirent Email!");
        return res.redirect('/authen/signup');
    }
    if (name) {
        req.flash('error', "Name is already in use. Please try with a diffirent Name!");
        return res.redirect('/authen/signup');
    }
    next();
}
module.exports.checkOut = (req, res, next) => {
    if (!req.session.user) {
        req.session.oldUrl = req.originalUrl;
        return res.redirect('/authen/login');
    }
    next();
}
