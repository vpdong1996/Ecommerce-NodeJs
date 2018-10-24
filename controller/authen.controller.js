
const cookieParser = require('cookie-parser');

module.exports.login = (req, res) => {
    res.render('authen/login', {
        title: 'Login'
    });
};
module.exports.postLogin = (req, res) => {
    res.redirect('/contact');
} 