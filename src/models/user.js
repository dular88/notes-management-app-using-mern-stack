const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamp: true });

module.exports = mongoose.model('users', postSchema);