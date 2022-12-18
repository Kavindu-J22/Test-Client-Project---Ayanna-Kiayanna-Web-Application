const router = require("express").Router();
let Payment = require("../models/payment");

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


//update payment
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    //destructure
    const{bankname, branch, email, contactnumber, date, paymentslip} = req.body;

    const updatePayment = {
        bankname,
        branch,
        email,
        contactnumber,
        date,
        paymentslip
    }

    const update = await Payment.findByIdAndUpdate(userId, updatePayment).then(() => {
        res.status(200).send({status: "Payment updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })
})

//delete payment
router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await Payment.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Payment deleted"});
    }).catch((err) => {
        
        res.status(500).send({status: "Error with deleting the payment", error: err.message});
    })
})

//search 
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await Payment.findById(userId).then(() => {
        res.status(200).send({status: "Payment fetched", user: user})
    }).catch(() => {
        console.timeLog(err.message);
        res.status(500).send({status: "Error with get payment", error: err.message});
    })
})


module.exports = router;
