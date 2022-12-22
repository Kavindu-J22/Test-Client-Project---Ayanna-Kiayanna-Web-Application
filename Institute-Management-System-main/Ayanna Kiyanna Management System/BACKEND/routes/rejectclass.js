const multer = require("multer");
const router = require("express").Router();
let AddClass = require("../models/RejectClassModel.js");


router.route("/addRejectClass").post((req, res) => {
  const Grade = req.body.Grade;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const SubjectNo = req.body.SubjectNo;
  const SubjectName = req.body.SubjectName;
  const TeacherName = req.body.TeacherName;
  const Link = req.body.Link;
  const content = req.body.content;

  const newAddClass = new AddClass({
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

router.route("/get").get((req, res) => {
  AddClass.find()
    .then((addclass) => {
      res.json(addclass);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let GNumber = req.params.id;
  const {
    Grade,
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content,
  } = req.body;

  const UpdateClass = {
    Grade,
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content,
  };

  const update = await AddClass.findOneAndUpdate({SubjectNo: GNumber}, UpdateClass)
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

router.route("/delete/:SubjectNo").delete(async (req, res) => {
  let GNumber = req.params.SubjectNo;

  AddClass.findOneAndDelete({ SubjectNo: GNumber })
    .then((addclass) => res.send(addclass))

    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:SubjectNo").get((async (req, res) => {
  let GNumber = req.params.SubjectNo;

    AddClass.find({ SubjectNo: GNumber })
    .then(addclass =>res.send(addclass))
    
    .catch((err) => {console.log(err);
    })
}));

module.exports = router;
