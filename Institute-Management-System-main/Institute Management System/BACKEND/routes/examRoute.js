const express = require("express");
const router = express.Router();
const Exams = require("../models/addExamModel");

//exam add
router.route("/addExam").post((req, res) => {
  const examname = req.body.examname;
  const classID = req.body.classID;
  const type = req.body.type;
  const date = req.body.date;
  const start = req.body.start;
  const end = req.body.end;
  const content = req.body.content;

  const newExam = new Exams({
    examname,
    classID,
    type,
    date,
    start,
    end,
    content,
  });

  newExam.save();
});

router.route("/getExams").get((req, res) => {
  Exams.find().then((foundex) => res.json(foundex));
});

router.route("/getExams/:_id").get((req, res) => {
  let id = req.params._id;
  Exams.find({ _id: id }).then((foundex) => res.json(foundex));
});

router.route("/delete/:examName").delete(async (req, res) => {
  let sid = req.params.examName;

  await Exams.findOneAndDelete({ examname: sid })
    .then(() => {
      res.status(200).send({ status: "exam delete!!" });
    })
    .catch((err) => {
      res.status(500).send({ status: "exam not found!!" });
    });
});

router.route("/update/:_id").put((req, res) => {
  let id = req.params._id;
  const examname = req.body.examname;
  const classID = req.body.classID;
  const type = req.body.type;
  const date = req.body.date;
  const start = req.body.start;
  const end = req.body.end;
  const content = req.body.content;

  const newExam = {
    examname,
    classID,
    type,
    date,
    start,
    end,
    content,
  };

  Exams.findByIdAndUpdate({ _id: id }, newExam)
    .then(() => {
      res.status(200).send({ status: "Exam updated!" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Exam not updated!" });
    });
});

module.exports = router;
