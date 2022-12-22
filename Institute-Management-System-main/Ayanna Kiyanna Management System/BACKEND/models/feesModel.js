const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const feeSchema = new Schema({

    class_id : {
        type : String,
        required: true
    },
    subject : {
        type : String,
        required: true
    },
    teacher_name : {
        type : String,
        required: true
    },
    amount : {
        type : String,
        required: true
    },
   

},


)

const Fee = mongoose.model("class_details",feeSchema);

module.exports = Fee;

