const express = require('express')

const router = express.Router()
const {createSchool,setadressToBody,getSchoolsPage,getAddSchoolPage,filterSchools,getSpecificSchool,deleteSchool,updateSchool,changePassword} = require('../services/schoolService')
const {createUser,getUserPage,updateUser} = require('../services/userService')
const {createSchoolValidator,getSchoolValidator,deleteSchoolValidator,updateSchoolValidator,changePasswordValidator} = require('../utils/validator/schoolValidator')
const {createUserValidator,updateUserValidator} = require('../utils/validator/userValidator')
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
router.route('/adduser')
        .get(getUserPage)
        .post(createUserValidator,createUser)
router.route('/addschool')
        .get(getAddSchoolPage)
        .post(createSchoolValidator,setadressToBody,createSchool)
router.get('/schools',getSchoolsPage)
// router.get('/schools/search',filterSchools)
router.post('/schools/updateuser',updateUser)
router.post('/schools/updateschool',setadressToBody,updateSchool)
router.post('/schools/deleteschool',deleteSchool)
    
router.get('/mapschools',(req,res,next)=>{
    res.render('mapschools')
})
router.get('/statics',(req,res,next)=>{
    res.render('statics')
})


module.exports = router;