const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
exports.addStudentValidator = [
  check('fullName').notEmpty().withMessage('الاسم الكامل اجباري'),
  check('BirthDate').notEmpty().withMessage('تاريخ الميلاد إجباري'),
  check('sex').notEmpty().withMessage('الجنس إجباري'),
  check('fatherName').notEmpty().withMessage('اسم الأب إجباري'),
  check('schoolStatus').notEmpty().withMessage('الوضعية مع المدرسة التربوية إجباري'),
  check('level').notEmpty().withMessage('المستوى التعليمي  إجباري'),
  check('quranSave').notEmpty().withMessage('مستوى حفظ القرآن إجباري'),
  validatorMiddleware(),
];

exports.getSpecificTeacherValidator = [];
