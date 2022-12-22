const router = require("express").Router();
// const multer = require("multer");
let allowance = require("../models/staffallowance");

//Image upload code part
// const storage = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,"../frontend/src/assets/upload")
//     },
//     filename:(req,file,callback)=>{
//         callback(null,file.originalname);
//     }
// })

// const upload = multer({storage:storage});

//Database insert allowance data 
router.route("/addallowance").post((req,res)=>{

    // let mail=req.params.email;
    // console.log(mail);

    const fname = req.body.fname;
    const sname = req.body.sname
    const email = req.body.email;
    const nic = req.body.nic;
    const amount =Number(req.body.amount);
    const date=req.body.date;

    const newstaff = new allowance({
        fname,
        sname,
        email,
        nic,
        amount,
        date
    })
        newstaff.save().then(()=>{
        res.json("Staff Allowance Added!!");
    }).catch((err)=>{
        console.log(err);
    })
    
})

//view all allowance data
router.route("/viewallowance/:nic/:date").get((req,res)=>{

    let ni=req.params.nic;
    let da=req.params.date;

    allowance.findOne({nic:ni,date:da}).then((curds)=>{
        res.json(curds)
    }).catch((err)=>{
        console.log(err);
    })
})

//cal all allowance amount
router.route("/totalallowance/:nic").get((req,res)=>{
    let ni=req.params.nic;
    
    allowance.find({nic:ni}).then((total={$sum:"$amount"})=>{
        res.json(total)
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