//import router package
const router = require("express").Router();
let supAttendance = require("../models/SupAttendance");

//Add Attendance

router.route("/addAttendance").post(async (req, res) => {
  const date = req.body.date;
  const classid = req.body.classid;
  const studentid = req.body.studentid;
  const name = req.body.name;
  const grade = req.body.grade;
  const subject = req.body.subject;

  const AttendanceNew = new supAttendance({
    date,
    classid,
    studentid,
    name,
    grade,
    subject,
  });

  //Javascript promise(like if else)
  AttendanceNew.save()
    .then(() => {
      res.json("Attendance Added"); //send the message as json format
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Attendance

router.route("/getAttendance").get((req, res) => {
  supAttendance
    .find()

    .then((SupAttendance) => {
      res.json(SupAttendance);
    })

    .catch((err) => {
      console.log(err);
    });
});

//Fetch one student

router.route("/oneStudent/:id").get(async (req, res) => {
  const user = await supAttendance.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Update Attendance

router.route("/update/:id").put(async (req, res) => {
  const user = await supAttendance.findById(req.params.id);

  if (user) {
    user.date = req.body.date || user.date;
    user.classid = req.body.classid || user.classid;
    user.studentid = req.body.studentid || user.studentid;
    user.name = req.body.name || user.name;
    user.grade = req.body.grade || user.grade;
    user.subject = req.body.subject || user.subject;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,

      date: updatedUser.date,
      classid: updatedUser.classid,
      studentid: updatedUser.studentid,
      name: updatedUser.name,
      grade: updatedUser.grade,
      subject: updatedUser.subject,
    });
  } else {
    res.status(404);

    throw new Error("User Not Found");
  }
});

//Delete Attendance

router.route("/delete/:studentid").delete(async (req, res) => {
  let GNumber = req.params.studentid;

  supAttendance
    .findOneAndDelete({ studentid: GNumber })
    .then((addclass) => res.send(addclass))

    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
