const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = {
  // examname: String,
  // classID: String,
  // studentID: String,
  content:String
};

const Answer = mongoose.model("Answers", answerSchema);

module.exports = Answer;
