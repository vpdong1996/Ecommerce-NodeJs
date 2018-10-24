const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    avatar: String,
    phone: Number
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;