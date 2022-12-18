const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddClassSchema = new Schema({
    StartTime : {
        type : String,
        required : true
    },
    EndTime : {
        type : String,
        required : true
    },
    SubjectNo : {
        type : String,
        required : true
    },
    SubjectName : {
        type : String,
        required : true
    },
    TeacherName : {
        type : String,
        required : true
    },
    Link : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    Grade : {
        type : String,
        required : true
    },
})

const GetClass = mongoose.model("AddClass",AddClassSchema);

module.exports = GetClass;