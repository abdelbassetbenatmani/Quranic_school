const express = require('express');
const router = express.Router();

const {
  login,
  signup,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  getLoginPage,
} = require('../services/authService');
const { loginValidator } = require('../utils/validator/authValidator');

router.post('/signup', signup);
router.route('/login').get(getLoginPage).post(loginValidator, login);
router.post('/forgotpassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.post('/resetPassword', resetPassword);
// router.post('/activateAccount',protect,allowedTo('admin'),activateAccount)

module.exports = router;
