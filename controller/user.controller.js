
const User = require('../models/user.model');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dongvu',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT
})
module.exports.index = async (req, res) => {
    const users = await User.find();
    res.render('users/index', {
        users,
        title: 'User List'
    });
};
module.exports.search = async (req, res) => {
    const q = req.query.q;
    const users = await User.find();
    const matchUsers = users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
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
        _id: id
    });
    res.redirect('/contact');
}
module.exports.postCreate = async (req, res) => {
    cloudinary.uploader.upload(req.file.path, async (result) => {
        req.body.avatar = result.secure_url;
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/contact');
    })
}
module.exports.editUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.render('users/editUser', {
        user
    });
}
module.exports.postEditUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (req.file) {
        cloudinary.uploader.upload(req.file.path, async (result) => {
            req.body.avatar = result.secure_url;

            await User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { overwrite: true, new: true })
            return res.redirect(`/contact`);
        })
    }
    else {
        await User.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                avatar: user.avatar
            }
        })
        return res.redirect('/contact')
    }

}