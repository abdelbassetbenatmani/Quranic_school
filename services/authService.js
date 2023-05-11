const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const apiError = require('../utils/apiError');
const User = require('../models/userModel');

const tokenExiste = (auth) => {
  /*if (auth && auth.startsWith('Bearer')) {
    return auth.split(' ')[1];
  }*/
};

const sharedVars = {};

const generateRestCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const hashedResetCode = (resetCode) =>
  crypto.createHash('sha256').update(resetCode).digest('hex');

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  const token = generateToken(user._id);
  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  // verify if the username does exist
  if (!user) {
    return res.render('login.pug', {
      loginError: 'خطأ في اسم المستخدم أو كلمة السر ',
      body: { username: req.body.username },
    });
  }
  // verify password
  const isPasswordCorrect =
    user.role === 'admin'
      ? await bcrypt.compare(req.body.password, user.password)
      : req.body.password === user.password;
  if (!isPasswordCorrect) {
    return res.render('login.pug', {
      loginError: 'خطأ في اسم المستخدم أو كلمة السر ',
      body: { username: req.body.username },
    });
  }
  const token = generateToken(user._id);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 3600 * 24 * 90,
  });
  const redirectPage = user.role === 'admin' ? '/dashboard' : '/myschool';
  return res.redirect(redirectPage);
});

exports.getLoginPage = (req, res) => {
  const protectError = sharedVars.protectError;
  sharedVars.protectError = null;
  res.render('login.pug', { protectError });
};

exports.protect = asyncHandler(async (req, res, next) => {
  // check token exist
  const { token } = req.cookies;
  if (!token) {
    //return next(new apiError('لست مسجل الدخول سجل دخولك أولا', 401));
    sharedVars.protectError = 'عليك ان تسجل الدخول';
    return res.redirect('/auth/login');
  }
  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.redirect('/auth/login');
  }

  // check user with userId is existe
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return res.redirect('/auth/login');
  }

  // check if user change password
  if (currentUser.passwordInfos) {
    const passwordChangedTimeStemp = parseInt(
      currentUser.passwordInfos.passwordChangedAt / 1000,
      10
    );
    if (passwordChangedTimeStemp > decoded.iat) {
      sharedVars.protectError =
        'لقد غيرت كلمة السر الخاصة بك يرجى إعادة تسجيل الدخول';
      return res.redirect('/auth/login');
    }
  }
  req.user = currentUser;
  next();
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // return next(new apiError('لا يسمح لك بالدخول إلى هذه الصفحة', 403));
      return res.render('denined');
    }
    next();
  });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new apiError(`لا يوجد حساب لدى هذا الاسم`, 404));
  }
  // if user existe generate ramdom code 6 digits and save it in db
  const resetCode = generateRestCode();
  const resetCodeHashed = hashedResetCode(resetCode);

  user.passwordResetCode = resetCodeHashed;
  user.passwordResetCodeExpired = Date.now() + 10 * 60 * 1000;
  user.passwordResetCodeVerify = false;

  await user.save();

  // Send Email
  const message = `<p>مرحبا لقد طلبت تغيير كلمة السر الخاصة بحسابك يرجى إدخال الرقم المكون من 6 أرقام المرفوق في هذا الإيميل إلى خانة تأكيد تغيير كلمة السر في الموقع </p>
    <h2>${resetCode}</h2>`;

  try {
    await sendEmail({
      email: school.email,
      subject: 'طلب تغيير كلمة السر ',
      message,
    });
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpired = undefined;
    user.passwordResetCodeVerify = undefined;
    user.save();

    return next(new apiError(`There was a problem to send email`, 500));
  }
  res.status(200).json({ status: 'تم إرسال الإيميل' });
});

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const resetCodeHashed = hashedResetCode(req.body.resetCode);
  const user = await User.findOne({
    passwordResetCode: resetCodeHashed,
    passwordResetCodeExpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new apiError(`رقم التحقق خاطئ أو منتهي الصلاحية `, 500));
  }
  user.passwordResetCodeVerify = true;
  user.save();
  res.status(200).json({ status: 'تم التحقق من الرقم' });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new apiError(`لا يوجد حساب خاص بهذا الإيميل`, 404));
  }
  if (!user.passwordResetCodeVerify) {
    return next(new apiError(`لم يتم التحقق من الرقم `, 400));
  }
  if (req.body.password !== req.body.rePassword) {
    return next(
      new apiError(
        `لا يوجد تطابق بين كلمة المرور و تأكيد كلمة المرور`,
        400
      )
    );
  }
  user.password = req.body.password;
  user.passwordResetCode = undefined;
  user.passwordResetCodeExpired = undefined;
  user.passwordResetCodeVerify = undefined;

  await user.save();
  const token = generateToken(user._id);
  res.status(200).json({ token });
});

// exports.activateAccount = asyncHandler(async (req,res,next)=>{

//     const school = await School.findOne(req.body.email);
//     if(!school){
//         return next(new apiError(`لا يوجد حساب يخص هذا الإيميل`,500))
//     }
//     school.active= true;
//     school.save()
//     res.status(200).json({status: 'تم تفعيل الحساب'})

// });

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 3600 * 24 * 90,
  });
  res.set('Location', 'http://localhost:3000/auth/login');
  res.status(302).send();
});

