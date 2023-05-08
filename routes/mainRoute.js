const router = require('express').Router();
const multer = require('multer');
const uploads = multer();
// services
const {
  getMainPage,
  createTeacher,
  getSpecificTeacher,
  updateTeacher,
} = require('../services/mainService');
// auth middlewares
const { protect } = require('../services/authService');
// validators
const {
  addTeacherValidator,
} = require('../utils/validator/teachersValidator');
router.route('/').get(protect, getMainPage);
router
  .route('/teachers')
  .post(protect, uploads.none(), addTeacherValidator, createTeacher);
router
  .route('/teachers/:id')
  .get(protect, getSpecificTeacher)
  .put(protect, uploads.none(), addTeacherValidator, updateTeacher);
module.exports = router;
