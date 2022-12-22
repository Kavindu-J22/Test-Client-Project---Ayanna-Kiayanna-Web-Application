const router = require("express").Router();
let StudentClass = require("../models/StudentClassViewmodel");

router.route("/addStudentClass").post((req, res) => {
  const Grade = req.body.Grade;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const SubjectNo = req.body.SubjectNo;
  const SubjectName = req.body.SubjectName;
  const TeacherName = req.body.TeacherName;
  const Link = req.body.Link;
  const content = req.body.content;

  const newAddClass = new StudentClass({
    Grade,
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content,
  });

  newAddClass
    .save()
    .then(() => {
      res.json("Class Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getStudentClass").get((req, res) => {
  StudentClass.find()
    .then((studentclass) => {
      res.json(studentclass);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
