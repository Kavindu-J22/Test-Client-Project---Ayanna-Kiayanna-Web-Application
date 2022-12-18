const mongoose = require('mongoose');

const resultSchema = {
    examname:{
       type: String,
       required: true 
    },
    name: String,
    studentID: String,
    result: String,
    grade: String
}

const StudentResults = mongoose.model("StudentResults", resultSchema);

module.exports = StudentResults;