//import router package
const router = require("express").Router();
let supAttendance = require("../models/ViewAttendance");

router.route("/addAttendance").post((req, res) => {
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

module.exports = router;
