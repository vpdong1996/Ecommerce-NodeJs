const User = require('../models/user.model');


module.exports.requireAuthen = async (req, res, next) => {
    if (!req.signedCookies.userId) {
        req.session.user = null;
        req.session.oldUrl = req.originalUrl;
        res.redirect('/authen/login');
        return;
    }

    const user = await User.findOne({
        _id: req.signedCookies.userId
    });

    if (!user) {
        res.redirect('/authen/login');
        return;
    }

    req.session.user = user;
    next();
}