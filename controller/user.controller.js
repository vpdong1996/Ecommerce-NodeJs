
const User = require('../models/user.model');

module.exports.index = async (req, res) => {
    const users = await User.find();
    res.render('users/index', {
        users,
        title : 'User List'
    });
};  
module.exports.search = async (req, res) => {
    const q = req.query.q;
    const users = await User.find();
    const matchUsers =  users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    console.log(matchUsers.password);
    res.render('users/index', {
        users: matchUsers
    });
}
module.exports.create = (req, res) => {
    res.render('users/createUser');
}
module.exports.viewId = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.render('users/view', {
        user: user
    });
}
module.exports.deleteId = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndRemove({
        _id : id
    });
    res.redirect('/contact');
}
module.exports.postCreate = async (req, res) => {
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/contact');
}