const express = require('express')

const router = express.Router()
const {createSchool,setadressToBody,getSchoolsPage,getAddSchoolPage,getStaticsPage,getSpecificSchool,deleteSchool,updateSchool,changePassword,getDashboardPage} = require('../services/schoolService')
const {createUser,getUserPage,getUsersList,updateUser} = require('../services/userService')
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

router.get('/',protect,allowedTo('admin'),getDashboardPage)
router.route('/users')
        .get(protect,allowedTo('admin'),getUsersList)
router.route('/adduser')
        .get(protect,allowedTo('admin'),getUserPage)
        .post(protect,allowedTo('admin'),createUserValidator,createUser)
router.route('/addschool')
        .get(protect,allowedTo('admin'),getAddSchoolPage)
        .post(protect,allowedTo('admin'),createSchoolValidator,setadressToBody,createSchool)
router.get('/schools',protect,allowedTo('admin'),getSchoolsPage)
// router.get('/schools/search',filterSchools)
router.post('/schools/updateuser',protect,allowedTo('admin'),updateUser)
router.post('/schools/updateschool',protect,allowedTo('admin'),setadressToBody,updateSchool)
router.post('/schools/deleteschool',protect,allowedTo('admin'),deleteSchool)
    
router.get('/mapschools',protect,allowedTo('admin'),(req,res,next)=>{
    res.render('mapschools')
})
router.get('/statics',protect,allowedTo('admin'),getStaticsPage)


module.exports = router;