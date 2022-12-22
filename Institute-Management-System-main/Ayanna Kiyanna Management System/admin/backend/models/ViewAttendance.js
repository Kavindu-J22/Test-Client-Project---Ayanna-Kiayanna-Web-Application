//Import mongoose package and declare it to a const variable
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creating a schema
const SupattendanceSchema = new Schema(
  {
    //Attributes

    date: {
      type: Date,
      required: true,
    },
    classid: {
      type: String,
      required: true, //Backend validation
    },
    studentid: {
      type: String,
      required: true, //Backend validation
    },
    name: {
      type: String,
      required: true, //Backend validation
    },
    grade: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//Pass the values to the database
//"PhysicalAttendance"- document name in the MongoDB database

const SupAttendance = mongoose.model(
  "Supervisor_Attendance",
  SupattendanceSchema
); //Two parameters

module.exports = SupAttendance;
