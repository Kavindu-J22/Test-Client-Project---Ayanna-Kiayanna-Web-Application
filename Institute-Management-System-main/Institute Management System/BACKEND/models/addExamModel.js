const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = {
  examname:{
    type:String,
    required:true,
  },
  classID: String,
  type: String,
  date: String,
  start: String,
  end: String,
  content: String,
};

const Exams = mongoose.model("Exams",examSchema);

module.exports = Exams;
