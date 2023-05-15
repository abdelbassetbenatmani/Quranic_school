const router = require('express').Router();
const multer = require('multer');
const uploads = multer();
// services
const {
  getMainPage,
  createTeacher,
  getSpecificTeacher,
  updateTeacher,
  createStudent,
  getSpecificStudent,
  updateStudent,
  updateStatusOfStudent
} = require('../services/mainService');
// auth middlewares
const { protect } = require('../services/authService');
// validators
const {
  addTeacherValidator,
} = require('../utils/validator/teachersValidator');
const {
  addStudentValidator,
} = require('../utils/validator/studentsValidator');

router.route('/').get(protect, getMainPage);
router
  .route('/teachers')
  .post(protect, uploads.none(), addTeacherValidator, createTeacher);
router
  .route('/teachers/:id')
  .get(protect, getSpecificTeacher)
  .put(protect, uploads.none(), addTeacherValidator, updateTeacher);

router
  .route('/students')
  .post(protect, uploads.none(), addStudentValidator, createStudent);

router
  .route('/students/:id')
  .get(protect, getSpecificStudent)
  .put(protect, uploads.none(), updateStudent);
router
  .route('/students/increase/:id')
  .get(protect, getSpecificStudent)
  .put(protect, uploads.none(), updateStatusOfStudent);
module.exports = router;
