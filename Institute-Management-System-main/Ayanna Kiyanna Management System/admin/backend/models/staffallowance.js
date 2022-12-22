const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffallowanceschema = new Schema({

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
    amount :{
        type : Number,
        required : true,
    },
    date :{
        type : String,
        required : true,
    }
})

const data = mongoose.model("staff_allowance",staffallowanceschema);
// console.log(staffschema);
module.exports = data;