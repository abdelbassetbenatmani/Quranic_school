const express = require('express')
const router = express.Router()

const {signup,login,forgotPassword,verifyPassResetCode,resetPassword,activateAccount,protect,allowedTo} = require('../services/authService')
const {signupValidator,loginValidator} = require('../utils/validator/authValidator')


router.post('/signup',signupValidator,signup)
router.post('/login',loginValidator,login)
router.post('/forgotpassword',forgotPassword)
router.post('/verifyResetCode',verifyPassResetCode)
router.post('/resetPassword',resetPassword)
// router.post('/activateAccount',protect,allowedTo('admin'),activateAccount)

module.exports = router;