const User = require('../models/user.model');


module.exports.requireAuthen = async (req, res, next) => {
    if (!req.signedCookies.userId){
        res.redirect('/authen/login');
        return;
    }
    
    const user = await User.findOne({
        _id : req.signedCookies.userId
    });

    if(!user){
        res.redirect('/authen/login');
        return;
    }

    res.locals.user = user;
    next();
}