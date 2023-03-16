const slugify = require('slugify')
const {check ,body} = require('express-validator');
const bcrypt = require('bcryptjs');

const validatorMiddleware = require('../../middleware/validatorMiddleware')
const School = require('../../models/schoolModel')
const Teacher = require('../../models/userModel')


const getUsers = async ()=>{
    const users = await Teacher.find({}).select({username:1 ,_id:1});
    console.log(`the  ${users}`);
    return users
}
exports.createSchoolValidator = [
    check('teacher').notEmpty().withMessage('اسم المستخدم إجباري')
    .custom((val) =>{
        return School.findOne({ teacher: val }).then((teacher) => {
            if (teacher) {
                return Promise.reject(new Error('اسم المستخدم مسجل مسبقا'));
            }
        })}
    ),
    check('name').notEmpty().withMessage('اسم المدرسة القرآنية إجباري')
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    check('daira').notEmpty().withMessage('يرجى تحديد الدائرة'),
    check('commune').notEmpty().withMessage('يرجى تحديد البلدية'),
    validatorMiddleware('addschool',{user: getUsers()})]

exports.getSchoolValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware('schools')]    

exports.deleteSchoolValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware('schools')]    

exports.updateSchoolValidator = [
        check('id').isMongoId().withMessage('Invalid User id format'),
        body('name')
          .optional()
          .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
          }),

        check('phone')
          .optional()
          .isMobilePhone(['ar-DZ'])
          .withMessage('أدخل رقم هاتف صحيح'),
        check('address').optional(),  
        validatorMiddleware('schools'),
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
        ,validatorMiddleware('schools')]