const User = require('../models/userModel');
const School = require('../models/schoolModel');
const SchoolFeatures = require('../utils/schoolFeatures');
const asyncHandler = require('express-async-handler');

exports.getTeachersPage = asyncHandler(async (req, res, next) => {
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
  res.render('teachers.pug', {
    stat,
    teachers: await schoolFeatures.getTeachers(),
    students: await schoolFeatures.getStudents(),
    name,
    daira,
  });
});
