const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      require: [true, 'name is required'],
      trim: true,
    },
    address: {
      commune: String,
      daira: String,
      street: String,
    },
    teachers: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        fullName: {
          type: String,
          require: [true, 'full name is required'],
        },
        type: {
          type: String,
          required: true,
          enum: ['employee', 'nonEmployee'],
        },
        grade: {
          type: String,
          default: null,
        },
        isAuthorized: {
          type: Boolean,
          default: false,
        },
        registrationDate: Date,
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
    students: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        fullName: {
          type: String,
          require: [true, 'full name is required'],
        },
        BirthDate: {
          type: Date,
          require: [true, 'date birthdate is required'],
        },
        sex: {
          type: String,
          require: [true, 'sex  is required'],
          enum: ['male', 'female'],
        },
        fatherName: {
          type: String,
          require: [true, 'father name is required'],
        },
        schoolStatus: {
          type: String,
          require: [true, 'school status is required'],
          enum: ['before', 'in', 'out', 'old'],
        },
        isInternal: {
          type: Boolean,
          default: false,
        },
        level: {
          type: String,
          enum: ['before', 'AP', 'AF', 'AS', 'UN', 'OUT'],
        },
        quranSave: {
          type: Number,
          require: [true, 'quran save is required'],
          enum: [0, 0.25, 0.5, 0.75, 1],
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

schoolSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'teacher',
    select: 'username password phone _id',
  });
  next();
});
const School = mongoose.model('School', schoolSchema);
module.exports = School;
