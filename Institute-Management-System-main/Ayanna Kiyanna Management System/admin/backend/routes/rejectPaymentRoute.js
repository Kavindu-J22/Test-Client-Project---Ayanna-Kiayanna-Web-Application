const router = require("express").Router();
let Payment = require("../models/rejectPaymentModel");

//add payment
router.route("/add").post((req,res)=>{

    const student_id = req.body.student_id;
    const classid = req.body.classid;
    const month = req.body.month;    
    const amount = req.body.amount;
    

    const bankname = req.body.bankname;
    const branch = req.body.branch;
    const email = req.body.email;
    const contactnumber = Number(req.body.contactnumber);
    const date = req.body.date;
    const paymentslip = req.body.paymentslip;

    const newPayment = new Payment({

        student_id,
        classid,
        month,        
        amount,
        bankname, 
        branch,
        email,
        contactnumber,
        date,
        paymentslip

    })

    //pass the object to mongodb
    newPayment.save().then(()=>{        

        //if data insertion is success
        res.json("Payment Added")
    }).catch((err)=>{      //if data insertion is unsuccess
        console.log(err);
    })

})
module.exports = router;