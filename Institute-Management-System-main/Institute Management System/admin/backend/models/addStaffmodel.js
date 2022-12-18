const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffschema = new Schema({

    fname :{
        type: String,
        required : true,
    },
    sname :{
        type: String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    nic :{
        type : String,
        required : true,
    },
    position :{
        type : String,
        required : true,
    },
    Pnumber :{
        type : Number,
        required : true,
    },
    type :{
        type: String,
        required : true,
    },
    gender :{
        type: String,
        required : true,
    },
    pic:{
        type: String,
        required:false,
    },
    addinfo :{
        type : String,
        required:false
    },
})

const data = mongoose.model("Add_Employee",staffschema);
// console.log(staffschema);
module.exports = data;