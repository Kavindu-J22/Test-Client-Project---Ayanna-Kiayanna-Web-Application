const express = require("express");
const { authTeacher } = require("../controllers/teacherLoginController");
const router = express.Router();
let Teacher = require("../models/teacherModel");

const { protect } = require("../middleware/teacherAuth");


router.route("/teacherLogin").post(authTeacher);

router.route("/find/:email").get(async (req, res) => {
  let teacherId = req.params.email; //fetch the id to the teacherId variable

    await Teacher.findOne({ email: teacherId })
      .then((teacher) => {
        res.status(200).send({ status: "Teacher Fetched!", teacher });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with Find Teacher!", error: err.message });
      });
});

//update teacher's profile
router.route("/updateTeacher/:email").put(async (req, res) => {
    let teacherId = req.params.email;  //fetch the id to the teacherId variable
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
    } = req.body;   

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

    const update = await Teacher.findOneAndUpdate(
      { email: teacherId },
      updateTeacher
    )
      .then(() => {
        res.status(200).send({ status: "Profile Updated!" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with Updating!", error: err.message });
      });

})


module.exports = router;