const router = require("express").Router();
let TimeTable = require("../models/TimeTableModel");

router.route("/addTimeTable").post((req, res) => {
  const Grade = req.body.Grade;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const Date = req.body.Date;
  const SubjectName = req.body.SubjectName;
  const TeacherName = req.body.TeacherName;


  const newTimeTable = new TimeTable({
    Grade,
    StartTime,
    EndTime,
    Date,
    SubjectName,
    TeacherName,
  });

  newTimeTable
    .save()
    .then(() => {
      res.json("Table row Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getTimeTable").get((req, res) => {
  TimeTable.find()
    .then((timetable) => {
      res.json(timetable);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let UNumber = req.params.id;
  const {
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content,
  } = req.body;

  const UpdateClass = {
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content,
  };

  const update = await AddClass.findByIdAndUpdate(UNumber, UpdateClass)
    .then(() => {
      res.status(200).send({ status: "Class Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let DNumber = req.params.id;

  await AddClass.findByIdAndDelete(DNumber)
    .then(() => {
      res.status(200).send({ status: "Class deleted" });
      console.log(`${DNumber}`);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete class", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let GNumber = req.params.id;

  const user = await AddClass.findById(GNumber)
    .then((addclass) => {
      res.status(200).send({ status: "Class fetched", addclass });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with getting class", error: err.message });
    });
});

module.exports = router;
