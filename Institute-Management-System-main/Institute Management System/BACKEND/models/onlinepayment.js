const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onlinepaymentSchema = new Schema({
    student_id : {
        type : String,
        required: true
    },
    classid : {
        type : String,
        required: true
    },
    month : {
        type : String,
        required: true
    },
    amount : {
        type : String,
        required: true
    },
    cvc : {
        type : Number,
        required: true
    },
    expiry : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    number : {
        type : Number,
        required: true
    }
   
    

},
)

const OnlinePayment = mongoose.model("OnlinePayment",onlinepaymentSchema);

module.exports = OnlinePayment;