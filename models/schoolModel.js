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
          enum: ['employee', 'nonEmployee'],
        },
        grade: {
          type: String,
        },
        status: {
          type: String,
          enum: ['auth', 'nonAuth'],
        },
        registrationDate: Date,
      },
    ],
    students: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        fullName: {
          type: String,
          require: [true, 'full name is required'],
        },
        BirthDay: {
          type: Date,
          require: [true, 'date birthday is required'],
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
        internal: {
          type: String,
        },
        level: {
          type: String,
          require: [true, 'level is required'],
          enum: ['before', 'AP', 'AF', 'AS', 'UN', 'OUT'],
        },
        quranSave: {
          type: Number,
          require: [true, 'quran save is required'],
          enum: [1 / 5, 1 / 4, 1 / 2, 3 / 4, 1],
        },
        isActive: Boolean,
        TRM: [
          {
            trmNumber: Number,
            year: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

schoolSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'teacher',
    select: 'username -_id',
  });
  next();
});
const School = mongoose.model('School', schoolSchema);
module.exports = School;
