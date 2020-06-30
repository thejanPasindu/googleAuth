const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);