const express = require("express");
const router = express.Router();
const Answer = require("../models/answerSubmit");

//exam add
router.route("/addAnswer").post((req, res) => {
  const examname = req.body.examname;
  const classID = req.body.classID;
  const studentID = req.body.sid;
  const content = req.body.content;

console.log(content);
  const newAnswer = new Answer({
    examname,
    classID,
    studentID,
    content,
  });

  newAnswer.save();
});

router.route("/getAnswer").get((req, res) => {
  Answer.find().then((foundex) => res.json(foundex));
});



module.exports = router;
