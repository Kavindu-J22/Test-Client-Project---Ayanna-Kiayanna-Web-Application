const router = require("express").Router();
let paysalary = require("../models/paysalary");

//Database insert allowance data 
router.route("/paysalary").post((req,res)=>{

    // let mail=req.params.email;
    // console.log(mail);

    const fname = req.body.fname;
    const sname = req.body.sname;
    const email = req.body.email;
    const nic = req.body.NIC;
    const position = req.body.position;
    const type = req.body.type;
    const allowance =Number(req.body.allowance);
    const basicsalary =Number(req.body.basicsalary);
    const date = req.body.date;
    // const type = req.body.type;

    const newstaff = new paysalary({
        fname,
        sname,
        email,
        nic,
        position,
        type,
        allowance,
        basicsalary,
        date
    })
        newstaff.save().then(()=>{
        res.json("Pay Added!!");
    }).catch((err)=>{
        console.log(err);
    })
    
})

//view all allowance data
router.route("/view/").get((req,res)=>{

    paysalary.find().then((curds)=>{
        res.json(curds)
    }).catch((err)=>{
        console.log(err);
    })
})

//update the  staff details
router.route("/update/proflie/updatestaff/:nic").put(async (req,res)=>{
    
    let ni = req.params.nic;
    
    const fname = req.body.fname;
    const sname = req.body.sname;
    const email = req.body.email;
    const nic = req.body.NIC;
    const position = req.body.position;
    const Pnumber =Number(req.body.Pnumber);
    const type = req.body.type;
    const gender = req.body.gender;
    //const school = req.body.school;
    
    //const {name,age,school} = req.body;

    const updatedetails ={
        fname,
        sname,
        email,
        nic,
        position,
        Pnumber,
        type,
        gender
    }
    const update = await Staff.findOneAndUpdate({nic:ni},updatedetails).then(()=>{
        res.status(200).send({status: "User updated!!"})
    }).catch((err)=>{
        res.status(500).send({status: "user not found!!"});
    })
})

//Database staff data delete
router.route("/proflie/delete/:nic").delete(async (req,res)=>{
    let ni = req.params.nic;
     
    console.log(ni);

    await Staff.findOneAndDelete({nic:ni}).then(()=>{
        res.status(200).send({status: "User delete!!"})
        
    }).catch((err)=>{
        res.status(500).send({status: "User not found!!"});
    })
})

module.exports = router;