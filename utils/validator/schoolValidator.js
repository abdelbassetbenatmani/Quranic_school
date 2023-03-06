const slugify = require('slugify')
const {check ,body} = require('express-validator');
const bcrypt = require('bcryptjs');

const validatorMiddleware = require('../../Middleware/validatorMiddleware')
const School = require('../../models/schoolModel')

exports.createSchoolValidator = [
    check('username').notEmpty().withMessage('اسم المستخدم إجباري')
    .custom((val) =>
        School.findOne({ username: val }).then((school) => {
        if (school) {
            return Promise.reject(new Error('اسم المستخدم مسجل مسبقا'));
        }
        })
    ),
    check('name').notEmpty().withMessage('اسم المدرسة القرآنية إجباري')
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    check('email').optional()
    .isEmail().withMessage('Invalid email address')
    .custom((val) =>
        School.findOne({ email: val }).then((school) => {
        if (school) {
            return Promise.reject(new Error('الإيميل مسجل مسبقا'));
        }
        })
    ),
    check('password').notEmpty().withMessage('كلمة السر إجباري')
    .isLength({ min:6}).withMessage('كلمة السر يجب أن تتكون من 6 أحرف أو أكثر')
    .custom((val,{req}) => {
        if(val !== req.body.confirmPassword){
            throw new Error('خطأ في تأكيد كلمة السر')
        }
        return true
    }),

    check('confirmPassword').notEmpty().withMessage('تأكيد كلمة السر إجباري'),
    check('phone').optional()
    .isMobilePhone('ar-DZ').withMessage('أدخل رقم صحيح'),
    validatorMiddleware]

exports.getSchoolValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]    

exports.deleteSchoolValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]    

exports.updateSchoolValidator = [
        check('id').isMongoId().withMessage('Invalid User id format'),
        body('name')
          .optional()
          .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
          }),
        check('email')
          .optional()
          .isEmail()
          .withMessage('أدخل إيميل صحيح')
          .custom((val) =>
            School.findOne({ email: val }).then((school) => {
              if (school) {
                return Promise.reject(new Error('الإيميل مسجل مسبقا'));
              }
            })
          ),
        check('phone')
          .optional()
          .isMobilePhone(['ar-DZ'])
          .withMessage('أدخل رقم هاتف صحيح'),
        check('address').optional(),  
        validatorMiddleware,
      ];

exports.changePasswordValidator = [
        check('id')
        .isMongoId().withMessage('incorrect id format'),
        body('currentpassword').notEmpty().withMessage('يجب إدخال كلمة السر الحالية'),
        body('confirmpassword').notEmpty().withMessage('تأكيد كلمة المرور الجديدة إجباري'),
        body('password').notEmpty().withMessage('أدخل كلمة المرور الجديدة').custom(async (val,{req})=>{
            // 1- verify current password
            const user = await School.findById(req.params.id)
            if(!user){
                throw new Error('لا يوجد مستخدم ')
            }
            const isCorrectPassword = await bcrypt.compare(req.body.currentpassword, user.password)
            if(!isCorrectPassword){
                throw new Error('كلمة السر الحالية خاطئة')
            }
            // 2- verify confirm password
            if(val !== req.body.confirmpassword){
                throw new Error('خطأ في تأكيد كلمة السر ')
            }
            return true
        })
        ,validatorMiddleware]