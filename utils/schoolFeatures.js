const School = require('../models/schoolModel');

class SchoolFeatures {
  constructor(userId) {
    this.userId = userId;
  }
  getSchool = async function () {
    const school = await School.findOne({ teacher: this.userId });
    return school;
  };
  getTeachers = async function (filterCallback = (e) => e) {
    const school = await this.getSchool();
    const { teachers } = school;
    return teachers.filter(filterCallback);
  };
  getStudents = async function (filterCallback = (e) => e) {
    const school = await this.getSchool();
    const { students } = school;
    return students.filter(filterCallback);
  };

  getNumberOfStudents = async function (filterCallback = (e) => e) {
    const students = await this.getStudents(filterCallback);
    return students.length;
  };

  getNumberOfTeachers = async function (filterCallback = (e) => e) {
    const teachers = await this.getTeachers(filterCallback);
    return teachers.length;
  };
  createTeacher = async function (teacherObj) {
    const school = await this.getSchool();
    school.teachers.push(teacherObj);
    await school.save();
  };
  getSpecificTeacher = async function (id) {
    const teachers = await this.getTeachers();
    return teachers.find((teacher) => teacher._id.toString() === id);
  };
  updateTeacher = async function (id, teacherObj) {
    const school = await this.getSchool();
    const { teachers } = school;
    const teacherIndex = teachers.findIndex(
      (teacher) => teacher._id.toString() === id
    );
    let teacher = teachers[teacherIndex];
    //console.log('teacherIndex : ', teacherIndex);
    const teacherId = teacher._id;
    teacher = { _id: teacherId, ...teacherObj };
    teachers[teacherIndex] = teacher;
    await school.save();
  };
}

module.exports = SchoolFeatures;
