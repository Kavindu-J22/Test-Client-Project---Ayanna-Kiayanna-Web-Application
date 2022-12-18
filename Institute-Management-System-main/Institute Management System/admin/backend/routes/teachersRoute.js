const router = require("express").Router();

let Teacher = require("../models/teacherModel.js");

//add teachers to DB
router.route("/add").post((req, res) => {

    //fetch the details to the variables
    const fName = req.body.fName;
    const lName = req.body.lName;
    const title = req.body.title;
    const gender = req.body.gender;
    const nic = req.body.nic;
    const mobileNo = Number(req.body.mobileNo);
    const email = req.body.email;
    const regNo = req.body.regNo;
    const classId = req.body.classId;
    const firstUN = req.body.firstUN;
    const firstPW = req.body.firstPW;
    const reFirstPW = req.body.reFirstPW;

    //creaate newTeacher object
    const newTeacher = new Teacher({
        
        fName,
        lName,
        title,
        gender,
        nic,
        mobileNo,
        email,
        regNo,
        classId,
        firstUN,
        firstPW,
        reFirstPW
    })

    newTeacher.save().then(() => {
        res.json("Teacher added!")
       

    }).catch((err) => {
        console.log(err);

    })
})

//get teacher's details from DB and display
router.route("/").get((req,res) => {

    Teacher.find().then((teachers) =>{
        res.json(teachers) 

    }).catch((err) => {
        console.log(err);

    })
})

//update teacher's details
router.route("/update/:id").put(async (req, res) => {
    let teacherId = req.params.id;  //fetch the id to the teacherId variable
    const {
      fName,
      lName,
      title,
      gender,
      nic,
      mobileNo,
      email,
      regNo,
      classId,
      firstUN,
      firstPW,
    } = req.body;    //destructor values (object)

    //create object for assign details
    const updateTeacher = {
      fName,
      lName,
      title,
      gender,
      nic,
      mobileNo,
      email,
      regNo,
      classId,
      firstUN,
      firstPW,
    };

    const update = await Teacher.findByIdAndUpdate(teacherId, updateTeacher).then(() => {
        res.status(200).send({status: "Teacher Updated!"})
    }).catch ((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating!", error: err.message});
    })

})


//delete techer from DB
router.route("/delete/:id").delete(async (req, res) => {    //async comes with await function
    let teacherId = req.params.id;  //fetch the id to the teacherId variable

    await Teacher.findByIdAndDelete(teacherId).then(() => {
        res.status(200).send({status: "Teacher Deleted!"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with Deletting!", error: err.message});
    })
})


//search techer and get details
router.route("/find/:_id").get(async (req, res) => {
    let teacherId = req.params._id;  //fetch the id to the teacherId variable

    await Teacher.findById(teacherId).then((teacher) => {
        res.status(200).send({status: "Teacher Fetched!", teacher})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with Find Teacher!", error: err.message});
    })
})


module.exports = router;

//run BACKEND - npm run dev/start