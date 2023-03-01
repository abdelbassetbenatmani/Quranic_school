const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {generateToken} = require('../utils/generateToken')
const sendEmail = require('../utils/sendEmail')
const apiError = require('../utils/apiError')
const School = require('../models/schoolModel')

const tokenExiste = (auth)=>{
    if(auth && auth.startsWith('Bearer')){
        return  auth.split(' ')[1];
    }

}

const generateRestCode= ()=>Math.floor(100000 + Math.random() * 900000).toString()
const hashedResetCode = (resetCode)=>crypto.createHash('sha256').update(resetCode).digest('hex')

exports.signup = asyncHandler(async (req,res,next)=>{
    const school = await School.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        adresses: req.body.adresses
    })
    const token = generateToken(school._id)
    res.status(201).json({data:school, token})
})

exports.login = asyncHandler(async (req,res,next)=>{
    const school = await School.findOne({email:req.body.email})
    if(!school || !(await bcrypt.compare(req.body.password,school.password))){

        return next(new apiError('خطأ في الإيميل أو كلمة السر ',401))
    }
    if(!school.active){
        return next(new apiError('الحساب غير مفعل يرجى إنتظار المكالمة من الإدارة لتفعيل حسابك',401))
    }
    const token = generateToken(school._id)
    res.status(200).json({data:school, token})
})

exports.protect = asyncHandler(async (req,res,next)=>{
    // check token exist 
    let token;
    token = tokenExiste(req.headers.authorization)

    if(!token){
        return next(new apiError('لست مسجل الدخول سجل دخولك أولا',401))
    }    
    // verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return next(new apiError('token invalid',401))
    }

    // check user with userId is existe
    const currentSchool = await School.findById(decoded.schoolId);
    if(!currentSchool){
         return next(new apiError('الحساب غير متاح حاليا',401))
    }
    

    // check if user change password
    if(currentSchool.passwordChangedAt){
        const passwordChangedTimeStemp = parseInt(currentSchool.passwordChangedAt / 1000, 10)
        if(passwordChangedTimeStemp > decoded.iat){
            return next(new apiError('لقد غيرت كلمة السر الخاصة بك يرجى إعادة تسجيل الدخول',401))
        }
    }
    req.school = currentSchool
    next();
});

exports.allowedTo = (...roles)=> asyncHandler(async (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new apiError('لا يسمح لك بالدخول إلى هذه الصفحة',403))
    }
    next()
});

exports.forgotPassword = asyncHandler(async (req,res,next)=>{
    // find user by email
    const school = await School.findOne({email:req.body.email})
    if(!school){
        return next(new apiError(`لا يوجد حساب لدى هذا الإيميل`,404))
    }
    // if user existe generate ramdom code 6 digits and save it in db 
    const resetCode = generateRestCode();
    const resetCodeHashed = hashedResetCode(resetCode);

    school.passwordResetCode = resetCodeHashed;
    school.passwordResetCodeExpired = Date.now() + 10*60*1000;
    school.passwordResetCodeVerify = false

    await school.save();
    
    // Send Email
    const message =`<p>مرحبا لقد طلبت تغيير كلمة السر الخاصة بحسابك يرجى إدخال الرقم المكون من 6 أرقام المرفوق في هذا الإيميل إلى خانة تأكيد تغيير كلمة السر في الموقع </p>
    <h2>${resetCode}</h2>`; ;

    try {
        await sendEmail({
            email:school.email,
            subject:'طلب تغيير كلمة السر ',
            message,
        })
    } catch (error) {       
        school.passwordResetCode = undefined;
        school.passwordResetCodeExpired =undefined
        school.passwordResetCodeVerify = undefined
        school.save()
        
        return next(new apiError(`There was a problem to send email`,500))
    }
    res.status(200).json({status: 'تم إرسال الإيميل'})
});

exports.verifyPassResetCode = asyncHandler(async (req,res,next)=>{
    const resetCodeHashed = hashedResetCode(req.body.resetCode);
    const school = await School.findOne({passwordResetCode:resetCodeHashed,passwordResetCodeExpired:{$gt:Date.now()}});
    if(!school){
        return next(new apiError(`رقم التحقق خاطئ أو منتهي الصلاحية `,500))
    }
    school.passwordResetCodeVerify= true;
    school.save()
    res.status(200).json({status: 'تم التحقق من الرقم'})

});

exports.resetPassword = asyncHandler(async (req,res,next)=>{
    const school = await School.findOne({email:req.body.email})
    if(!school){
         return next(new apiError(`لا يوجد حساب خاص بهذا الإيميل`,404))
    }
    if(!school.passwordResetCodeVerify){
        return next(new apiError(`لم يتم التحقق من الرقم `,400))
    }
    if(req.body.password !==req.body.rePassword){
        return next(new apiError(`لا يوجد تطابق بين كلمة المرور و تأكيد كلمة المرور`,400))
    }
    school.password = req.body.password
    school.passwordResetCode = undefined;
    school.passwordResetCodeExpired = undefined;
    school.passwordResetCodeVerify = undefined

    await school.save();
    const token = generateToken(school._id)
    res.status(200).json({token})


})

exports.activateAccount = asyncHandler(async (req,res,next)=>{

    const school = await School.findOne(req.body.email);
    if(!school){
        return next(new apiError(`لا يوجد حساب يخص هذا الإيميل`,500))
    }
    school.active= true;
    school.save()
    res.status(200).json({status: 'تم تفعيل الحساب'})

});