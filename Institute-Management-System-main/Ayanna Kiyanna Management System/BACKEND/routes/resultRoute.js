const express = require("express");
const router = express.Router();
const StudentResults = require("../models/addResultsModel");

router.route("/addResults").post((req, res) => {
  const examname = req.body.examname;
  const name = req.body.name;
  const studentID = req.body.studentID;
  const result = req.body.result;
  const grade = req.body.grade;

  const newStudentResults = new StudentResults({
    examname,
    name,
    studentID,
    result,
    grade,
  });

  newStudentResults.save();
});

router.route("/getResults").get((req, res) => {
  StudentResults.find().then((foundRes) => res.json(foundRes));
});

router.route("/getResults/:_id").get((req, res) => {
  let id = req.params._id;
  StudentResults.find({ _id: id }).then((foundex) => res.json(foundex));
});

router.route("/results/delete/:_id").delete(async (req, res) => {
  let id = req.params._id;

  // console.log(pn);

  await StudentResults.findOneAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ status: "result delete!!" });
    })
    .catch((err) => {
      res.status(500).send({ status: "results not found!!" });
    });
});

router.route("/results/update/:_id").put((req, res) => {
  let id = req.params._id;
  const examname = req.body.examname;
  const name = req.body.name;
  const studentID = req.body.studentID;
  const result = req.body.result;
  const grade = req.body.grade;

  const newStudentResults = {
    examname,
    name,
    studentID,
    result,
    grade,
  };

  StudentResults.findByIdAndUpdate({ _id: id }, newStudentResults)
    .then(() => {
      res.status(200).send({ status: "Exam updated!" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Exam not updated!" });
    });
});

module.exports = router;
