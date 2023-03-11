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
    email:{
        type: String,
        // required:[true,'email is required'],
        unique:true,
        default:null,
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
        enum:['user','admin'],
        default: 'user',
    },
  

},{timestamps: true});

teacherSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
})
const Teacher = mongoose.model('teacher',teacherSchema);
module.exports = Teacher