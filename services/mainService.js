const { Types } = require('mongoose');
const User = require('../models/userModel');
const School = require('../models/schoolModel');
const SchoolFeatures = require('../utils/schoolFeatures');
const asyncHandler = require('express-async-handler');

exports.getMainPage = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const schoolFeatures = new SchoolFeatures(user._id);
  const school = await schoolFeatures.getSchool(user._id);
  const { name, address = {} } = school;
  const { daira } = address;
  const stat = {
    nStudents: await schoolFeatures.getNumberOfStudents(),
    nMales: await schoolFeatures.getNumberOfStudents(
      (students) => students.sex === 'male'
    ),
    nFemales: await schoolFeatures.getNumberOfStudents(
      (students) => students.sex === 'female'
    ),
    nTeachers: await schoolFeatures.getNumberOfTeachers(),
  };
  //console.log('teachers : ', getTeachers(school));
  res.render('index.pug', {
    stat,
    teachers: await schoolFeatures.getTeachers(),
    students: await schoolFeatures.getStudents(),
    name,
    daira,
  });
});

exports.createTeacher = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const schoolFeatures = new SchoolFeatures(user._id);
  const {
    fullName,
    type,
    grade,
    isAuthorized = req.body.type === 'employee' ? true : false,
    registrationDate,
  } = req.body;
  // teachers object shape
  const newTeacher = {
    _id: Types.ObjectId(),
    fullName,
    type,
    grade,
    isAuthorized,
    registrationDate,
  };
  await schoolFeatures.createTeacher(newTeacher);
  res.json({
    msg: 'تمت الاضافة بنجاح',
    teacher: newTeacher,
    numberOfTeachers: await schoolFeatures.getNumberOfTeachers(),
  });
});

exports.getSpecificTeacher = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const schoolFeatures = new SchoolFeatures(user._id);
  const teacher = await schoolFeatures.getSpecificTeacher(req.params.id);
  res.json({ msg: 'scc', teacher });
});

exports.updateTeacher = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const schoolFeatures = new SchoolFeatures(user._id);
  const {
    fullName,
    type,
    grade,
    isAuthorized = req.body.type === 'employee' ? true : false,
    registrationDate,
  } = req.body;
  // teachers object shape
  const newTeacher = {
    _id: req.params.id,
    fullName,
    type,
    grade,
    isAuthorized,
    registrationDate,
  };
  await schoolFeatures.updateTeacher(req.params.id, newTeacher);
  res.json({
    msg: 'تم التعديل بنجاح',
    teacher: newTeacher,
    numberOfTeachers: await schoolFeatures.getNumberOfTeachers(),
  });
});


exports.createStudent = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const schoolFeatures = new SchoolFeatures(user._id);
  const {
    fullName ,
    BirthDate,
    sex,
    fatherName,
    schoolStatus,
    isInternal ,
    level ,
    quranSave,
  }  = req.body;
  // teachers object shape
  const newStudent = {
    _id: Types.ObjectId(),
    fullName,
    BirthDate,
    sex,
    fatherName,
    schoolStatus:{
      status:schoolStatus,
      date:Date.now()
    },
    isInternal ,
    level ,
    quranSave:{
      Qsave:quranSave,
      date:Date.now()
    },
  };
  await schoolFeatures.createStudent(newStudent);
  res.json({
    msg: 'تمت الاضافة بنجاح',
    student: newStudent,
    numberOfStudent: await schoolFeatures.getNumberOfStudents(),
  });
});