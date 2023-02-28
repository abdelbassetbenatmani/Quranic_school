const express = require('express')
const router = express.Router()

const {signup} = require('../services/authService')
const {signupValidator} = require('../utils/validator/authValidator')

router.post('/signup',signupValidator,signup)

module.exports = router;