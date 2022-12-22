const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Create the schema
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  studentid: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },
  parentname: {
    type: String,
    required: false,
  },

  home: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },

  male: {
    type: String,
    required: false,
  },
  female: {
    type: String,
    required: false,
  },
  grade: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Taking the data from routes and assign into variables
const Student = mongoose.model("user", studentSchema); //Document name and Schema name

module.exports = Student;
