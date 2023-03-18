const User = require('../models/userModel');
const School = require('../models/schoolModel');

exports.getTeachersPage = async (req, res, next) => {
  res.render('teachers.pug');
};
