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
        signed : true
    });
    next();
}