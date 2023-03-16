const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,'username is required'],
        trim:true,
        unique:[true,"username is unique"]
    },

    slug:{
        type: String,
        lowercase:true
    },

    phone:String,
    password:{
        type: String,
        required:[true,'password is required'],
        minlength:6,
    },
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetCodeExpired:Date,
    passwordResetCodeVerify:Boolean,
    role:{
        type: String,
        enum:['teacher','admin'],
        default: 'teacher',
    },
  

},{timestamps: true});


const User = mongoose.model('User',teacherSchema);
module.exports = User