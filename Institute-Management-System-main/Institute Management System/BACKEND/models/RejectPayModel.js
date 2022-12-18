const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const rejectpaymentSchema = new Schema({

    student_id : {
        type : String,
        //required: true
    },
    classid : {
        type : String,
        //required: true
    },
  
    month : {
        type : String,
        //required: true
    },
    
    amount : {
        type : String,
        //required: true
    },

    bankname : {
        type : String,
        //required: true
    },
    branch: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required: true
    },
    contactnumber: {
        type: Number,
        //required: true
    },
    date: {
        type: Date,
        //required: true
    },
    paymentslip: {
        type: String,
        //required: true
    }
  

},

)

const RejectPayment = mongoose.model("RejectPayment",rejectpaymentSchema);

module.exports = RejectPayment;
