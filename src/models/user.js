const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({

    failed_login_attempts: {
         type: Number, default: 0 
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    state:{
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
        versionKey: false,
        resetPassword:false,
})



module.exports = mongoose.model('user', UserScheme)