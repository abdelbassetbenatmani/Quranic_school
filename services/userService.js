const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const factory = require('./handelersFactory');
const apiError = require('../utils/apiError')

const Teacher = require('../models/userModel')

module.exports.getUserPage =  asyncHandler(async (req, res,next) => {
    res.render('adduser',{errors:[],added:req.flash("added")[0]})
})
// module.exports.createSchool = factory.createOne(School)
module.exports.createUser =  asyncHandler(async (req, res,next) => {
    await Teacher.create(req.body)
    req.flash("added", true);
    res.redirect('/dashboard/adduser')
})

module.exports.getUsers = factory.getAll(Teacher)

module.exports.getSpecificUser = factory.getOne(Teacher)

module.exports.deleteUser = factory.deleteOne(Teacher)

module.exports.updateUser = asyncHandler(async (req, res,next) => {
    const document = await Teacher.findByIdAndUpdate(req.body.userId,{
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
    }, { new: true })
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('لا يوجد حساب على هذا الرقم',404))
    }

    res.redirect('/dashboard/schools')

})

exports.changePassword = asyncHandler(async (req, res,next) => {
    const document = await Teacher.findByIdAndUpdate(req.params.id,{
        password : await bcrypt.hash(req.body.password,12),
        passwordChangedAt:Date.now()
    }, { new: true })
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})
