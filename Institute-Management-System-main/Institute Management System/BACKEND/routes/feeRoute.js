const router = require("express").Router();
let Fee = require("../models/feesModel");


//retrieve payment
router.route("/get").get((req,res)=>{

    Fee.find().then((feedetails)=>{
        res.json(feedetails)

    }).catch((err)=>{
        console.log(err)
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
