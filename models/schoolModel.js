const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schoolSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,'username is required'],
        trim:true,
        unique:[true,"username is unique"]
    },
    name:{
        type:String,
        require:[true,'name is required'],
        trim:true
    },

    slug:{
        type: String,
        lowercase:true
    },
    email:{
        type: String,
        // required:[true,'email is required'],
        unique:true,
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
    address:{
        comune:String,
        daira:String,
        street:String        
    }
    ,
    // active:{
    //     type: Boolean,
    //     default:false,
    // },
    teachers:[{
        id:{type:mongoose.Schema.Types.ObjectId,},
        fullName :{
            type:String,
            require:[true,'full name is required'],
        },
        type:{
            type:String,
            enum:['employee','nonEmployee']
        },
        grade:{
            type:String
        },
        status:{
            type:String,
            enum:['auth','nonAuth']
        },
        registrationDate:Date
    }],
    students:[
        {
            id:{type:mongoose.Schema.Types.ObjectId,},
            fullName :{
                type:String,
                require:[true,'full name is required'],
            },
            BirthDay:{
                type:Date,
                require:[true,'date birthday is required']
            },
            sex:{
                type:String,
                require:[true,'sex  is required'],
                enum:['male','female']
            },
            fatherName :{
                type:String,
                require:[true,'father name is required'],
            },
            schoolStatus:{
                type:String,
                require:[true,'school status is required'],
                enum:['before','in','out','old']
            },
            internal:{
                type:String,
            },
            level:{
                type:String,
                require:[true,'level is required'],
                enum:['before','AP','AF','AS','UN','OUT']
            },
            quranSave:{
                type:Number,
                require:[true,'quran save is required'],
                enum:[1/5,1/4,1/2,3/4,1]
            },
            isActive:Boolean,
            TRM:[{
                trmNumber:Number,
                year:Number,
            }]
        }
    ]
},{timestamps: true});

schoolSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
})
const School = mongoose.model('school',schoolSchema);
module.exports = School