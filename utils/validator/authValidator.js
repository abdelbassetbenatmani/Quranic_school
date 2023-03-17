const slugify = require('slugify');
const { check } = require('express-validator');

const validatorMiddleware = require('../../middleware/validatorMiddleware');
const setBodyToRenderOptions = require('../../middleware/setBodyToRenderMiddleware');
const School = require('../../models/schoolModel');

// exports.signupValidator = [
//     check('username').notEmpty().withMessage('أدخل اسم المستخدم '),
//     check('name').notEmpty().withMessage('أدخل اسم المدرسة القرآنية')
//     .custom((val,{req}) => {
//         req.body.slug = slugify(val)
//         return true
//     }),
//     check('email').notEmpty().withMessage('الإيميل إجباري')
//     .isEmail().withMessage('خطأ في كتابة الإيميل')
//     .custom((val) =>
//         School.findOne({ email: val }).then((user) => {
//         if (user) {
//             return Promise.reject(new Error('الإيميل مستخدم بالفعل'));
//         }
//         })
//     ),
//     check('password').notEmpty().withMessage('أدخل كلمة السر')
//     .isLength({ min:6}).withMessage('كلمة السر تتكون من 6 حروف أو أكثر')
//     .custom((val,{req}) => {
//         if(val !== req.body.confirmPassword){
//             throw new Error('خطأ في تأكيد كلمة المرور')
//         }
//         return true
//     }),

//     check('confirmPassword').notEmpty().withMessage('أدخل تأكيد كلمة المرور'),
//     check('phone').optional()
//     .isMobilePhone('ar-DZ').withMessage('أدخل رقم هاتف صحيح'),
//     // check('comune').notEmpty().withMessage(' البلدية الخاصة بالمدرسة القراآنية إجبارية'),
//     // check('daira').notEmpty().withMessage('الدائرة الخاصة بالمدرسة القراآنية إجبارية'),
//     validatorMiddleware
// ]

exports.loginValidator = [
  check('username').notEmpty().withMessage('يرجى إدخال اسم المستخدم'),
  check('password').notEmpty().withMessage('كلمة السر إجبارية '),
  setBodyToRenderOptions,
  validatorMiddleware('login.pug'),
];
