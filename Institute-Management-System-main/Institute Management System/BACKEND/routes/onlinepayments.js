const router = require("express").Router();
let OnlinePayment = require("../models/onlinepayment");

//add credit card payment
router.route("/addonline").post((req,res)=>{

    const student_id = req.body.student_id;
    const classid = req.body.classid;
    const month = req.body.month; 
    const amount = req.body.amount;

    const cvc = Number(req.body.cvc);
    const expiry = req.body.expiry;
    const name = req.body.name;
    const number = Number(req.body.number);
    

    const newOnlinePayment = new OnlinePayment({
        student_id,
        classid,
        month,
        amount,
        cvc,
        expiry,
        name,
        number
        

    })

    //pass the objects to the mongodb
    newOnlinePayment.save().then(()=>{

        //if data inserted
        res.json("Payment Added")
        }).catch(()=>{  //if data insertion is unsuccess
            console.log(err);
        })





})
module.exports = router;