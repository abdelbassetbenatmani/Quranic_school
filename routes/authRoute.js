const express = require('express')
const router = express.Router()

const {login,forgotPassword,verifyPassResetCode,resetPassword} = require('../services/authService')
const {loginValidator} = require('../utils/validator/authValidator')


// router.post('/signup',signupValidator,signup)
router.post('/login',loginValidator,login)
router.post('/forgotpassword',forgotPassword)
router.post('/verifyResetCode',verifyPassResetCode)
router.post('/resetPassword',resetPassword)
// router.post('/activateAccount',protect,allowedTo('admin'),activateAccount)

module.exports = router;