const slugify = require('slugify');
const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');

const validatorMiddleware = require('../../middleware/validatorMiddleware');
const School = require('../../models/schoolModel');
const Teacher = require('../../models/userModel');

const getUsersMiddleware = async (req, res, next) => {
  const users = await Teacher.find({}).select({ username: 1, _id: 1 });
  if (!req.renderOptions) req.renderOptions = {};
  req.renderOptions.user = users;
  next();
};
exports.createSchoolValidator = [
  check('teacher')
    .notEmpty()
    .withMessage('اسم المستخدم إجباري')
    .custom(async (val) => {
      const teacher = await School.findOne({ teacher: val });
      if (teacher) throw new Error('اسم المستخدم مسجل مسبقا');
      return true;
    }),
  check('name')
    .notEmpty()
    .withMessage('اسم المدرسة القرآنية إجباري')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('daira').notEmpty().withMessage('يرجى تحديد الدائرة'),
  check('commune').notEmpty().withMessage('يرجى تحديد البلدية'),
  //validatorMiddleware('addschool', { user: Promise.resolve(getUsers()) }),
  // getUsersMiddleware,
  validatorMiddleware('addschool'),
];

exports.getSchoolValidator = [
  check('id').isMongoId().withMessage('incorrect id format'),
  validatorMiddleware('schools'),
];

exports.deleteSchoolValidator = [
  check('id').isMongoId().withMessage('incorrect id format'),
  validatorMiddleware('schools'),
];

exports.updateSchoolValidator = [
  check('schoolId').isMongoId().withMessage('Invalid School id format'),
  body('name').notEmpty().withMessage('اسم المدرسة إجباري'),
  validatorMiddleware('schools'),
];

// exports.changePasswordValidator = [
//   check('id').isMongoId().withMessage('incorrect id format'),
//   body('currentpassword')
//     .notEmpty()
//     .withMessage('يجب إدخال كلمة السر الحالية'),
//   body('confirmpassword')
//     .notEmpty()
//     .withMessage('تأكيد كلمة المرور الجديدة إجباري'),
//   body('password')
//     .notEmpty()
//     .withMessage('أدخل كلمة المرور الجديدة')
//     .custom(async (val, { req }) => {
//       // 1- verify current password
//       const user = await School.findById(req.params.id);
//       if (!user) {
//         throw new Error('لا يوجد مستخدم ');
//       }
//       const isCorrectPassword = await bcrypt.compare(
//         req.body.currentpassword,
//         user.password
//       );
//       if (!isCorrectPassword) {
//         throw new Error('كلمة السر الحالية خاطئة');
//       }
//       // 2- verify confirm password
//       if (val !== req.body.confirmpassword) {
//         throw new Error('خطأ في تأكيد كلمة السر ');
//       }
//       return true;
//     }),
//   validatorMiddleware('schools'),
// ];
