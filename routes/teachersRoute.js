const router = require('express').Router();
const multer = require('multer');
const uploads = multer();
// services
const {
  getTeachersPage,
  createTeacher,
} = require('../services/teachersService');
// auth middlewares
const { protect } = require('../services/authService');
// validators
const {
  addTeacherValidator,
} = require('../utils/validator/teachersValidator');
router
  .route('/')
  .get(protect, getTeachersPage)
  .post(protect, uploads.none(), addTeacherValidator, createTeacher);

module.exports = router;
