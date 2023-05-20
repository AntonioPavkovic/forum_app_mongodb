const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;