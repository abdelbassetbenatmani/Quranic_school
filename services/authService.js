const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {generateToken} = require('../utils/generateToken')
const apiError = require('../utils/apiError')
const School = require('../models/schoolModel')

const tokenExiste = (auth)=>{
    if(auth && auth.startsWith('Bearer')){
        return  auth.split(' ')[1];
    }

}

exports.signup = asyncHandler(async (req,res,next)=>{
    const school = await School.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        adresses: req.body.adresses
    })
    const token = generateToken(school._id)
    res.status(201).json({data:school, token})
})
