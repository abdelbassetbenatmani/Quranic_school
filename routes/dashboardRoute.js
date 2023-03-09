const express = require('express')

const router = express.Router()
const {createSchool,getSchools,getSpecificSchool,deleteSchool,updateSchool,changePassword} = require('../services/schoolService')
const {createSchoolValidator,getSchoolValidator,deleteSchoolValidator,updateSchoolValidator,changePasswordValidator} = require('../utils/validator/schoolValidator')
const {protect,allowedTo} = require('../services/authService')

// router.put('/changepassword/:id',changePasswordValidator,changePassword)

// router.route('/')
//     .get(protect,allowedTo("admin"),getSchools)
//     .post(protect,allowedTo("admin"),createSchoolValidator,createSchool)

// router.route('/:id')
//     .put(protect,allowedTo('admin'),updateSchoolValidator,updateSchool)
//     .get(protect,allowedTo("admin"),getSchoolValidator,getSpecificSchool)    
//     .delete(protect,allowedTo("admin"),deleteSchoolValidator,deleteSchool)    

router.get('/',(req,res,next)=>{
    res.render('dashboard')
})
router.get('/addschool',(req,res,next)=>{
    res.render('addschool')
})
router.get('/schools',(req,res,next)=>{
    res.render('schools')
})
router.get('/mapschools',(req,res,next)=>{
    res.render('mapschools')
})
router.get('/statics',(req,res,next)=>{
    res.render('statics')
})


module.exports = router;