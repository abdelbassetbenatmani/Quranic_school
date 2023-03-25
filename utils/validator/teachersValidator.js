const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
exports.addTeacherValidator = [
  check('fullName').notEmpty().withMessage('الاسم الكامل اجباري'),
  check('type').notEmpty().withMessage('الحالة اجبارية'),
  check('grade').notEmpty().withMessage('يرجى تحديد الرتبة'),
  check('registrationDate')
    .notEmpty()
    .withMessage('يرجى تحديد تاريخ التعيين'),
  validatorMiddleware(),
];
