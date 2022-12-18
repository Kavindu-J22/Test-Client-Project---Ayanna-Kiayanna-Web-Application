//Import mongoose package and declare it to a const variable
const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//Creating a schema
const attendanceSchema = new Schema({ 
    //Attributes
    classid : {
        type : String,
        required : true //Backend validation
    },
    date : {
        type : Date,
        default : Date.now
    },
    totalStudents : {
        type : Number,
        required : true
    },
    attendance : {
        type : Number,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    
})

//Pass the values to the database
//"Student"- document name in the MongoDB database

const Attendance = mongoose.model("Attendance", attendanceSchema)//Two parameters

module.exports = Attendance;

