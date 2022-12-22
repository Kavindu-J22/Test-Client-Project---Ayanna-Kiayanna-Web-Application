const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeTableSchema = new Schema({
  Grade: {
    type: String,
    // required : true
  },
  StartTime: {
    type: String,
    // required : true
  },
  EndTime: {
    type: String,
    // required : true
  },
  Date: {
    type: String,
    // required : true
  },
  SubjectName: {
    type: String,
    // required : true
  },
  TeacherName: {
    type: String,
    // required : true
  },
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);

module.exports = TimeTable;
