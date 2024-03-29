const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const factory = require('./handelersFactory');
const apiError = require('../utils/apiError')

const School = require('../models/schoolModel')
const Teacher = require('../models/userModel')

// module.exports.createSchool = factory.createOne(School)
module.exports.getAddSchoolPage =  asyncHandler(async (req, res,next) => {
    res.render('addschool',{errors:req.flash("errors"),added: req.flash("added")[0]})
})

exports.setadressToBody = (req, res, next) => {
    if (!req.body.adress) {
        const address = {
            daira: req.body.daira,
            commune: req.body.commune,
            street : req.body.street
        }
        req.body.address = address
    }
    next()
}

module.exports.createSchool =  asyncHandler(async (req, res,next) => { 
    await School.create(req.body)
    req.flash("added", true);
    res.redirect('/dashboard/addschool')
})

module.exports.getSchoolsPage = factory.getAll('schools',School)

module.exports.getDashboardPage = factory.getAll('dashboard',School)



module.exports.getSpecificSchool = factory.getOne(School)

module.exports.deleteSchool = asyncHandler(async (req, res,next) => {
    const {userId,schoolId} = req.body
    const user = await Teacher.findByIdAndDelete(userId)
    user.remove()
    const school =await School.findByIdAndDelete(schoolId)
    school.remove()
    res.redirect('/dashboard/schools')
})

module.exports.updateSchool = asyncHandler(async (req, res,next) => {
    const document = await School.findByIdAndUpdate(req.body.schoolId,{
        name: req.body.name,
        address: req.body.address
    }, { new: true })
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('لا يوجد حساب على هذا الرقم',404))
    }
    res.redirect('/dashboard/schools')
})

module.exports.getStaticsPage =  factory.getAll('statics',School)