const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamp: true });

module.exports = mongoose.model('notes', noteSchema);