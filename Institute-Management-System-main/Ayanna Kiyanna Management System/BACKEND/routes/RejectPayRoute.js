const router = require("express").Router();
let Payment = require("../models/RejectPayModel");

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
    }).catch(()=>{      //if data insertion is unsuccess
        console.log(err);
    })
    

})

//retrieve payment
router.route("/get").get((req,res)=>{

    Payment.find().then((payments)=>{
        res.json(payments)

    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/get/:student_id").get((async (req, res) => {

  let GNumber = req.params.student_id;



    Payment.find({ student_id: GNumber })

    .then(payment =>res.send(payment))

    

    .catch((err) => {console.log(err);

    })

}));

router.route("/update/:id").put(async (req, res) => {

  let GNumber = req.params.id;

  const {

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

  } = req.body;



  const UpdatePayment = {

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

  };



  const update = await Payment.findOneAndUpdate({student_id: GNumber}, UpdatePayment)

    .then(() => {

      res.status(200).send({ status: "Payment Updated" });

    })

    .catch((err) => {

      console.log(err);

      res

        .status(500)

        .send({ status: "Error with updating", error: err.message });

    });

});

module.exports = router;