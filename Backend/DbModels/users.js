const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        
    },

    password: {
        type: String,
    },


    })

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;