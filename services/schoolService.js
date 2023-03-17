const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const factory = require('./handelersFactory');
const apiError = require('../utils/apiError')

const School = require('../models/schoolModel')
const Teacher = require('../models/userModel')

// module.exports.createSchool = factory.createOne(School)
module.exports.getAddSchoolPage =  asyncHandler(async (req, res,next) => {
    const user = await Teacher.find({}).select({username:1 ,_id:1});
    res.render('addschool',{errors:req.flash("errors"),added: req.flash("added")[0],user})
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

module.exports.geSchoolsPage = factory.getAll(School)

module.exports.getSpecificSchool = factory.getOne(School)

module.exports.deleteSchool = factory.deleteOne(School)

module.exports.updateSchool = asyncHandler(async (req, res,next) => {
    const document = await School.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }, { new: true })
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('لا يوجد حساب على هذا الرقم',404))
    }
    res.status(200).json({data:document})
})

exports.changePassword = asyncHandler(async (req, res,next) => {
    const document = await School.findByIdAndUpdate(req.params.id,{
        password : await bcrypt.hash(req.body.password,12),
        passwordChangedAt:Date.now()
    }, { new: true })
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})
