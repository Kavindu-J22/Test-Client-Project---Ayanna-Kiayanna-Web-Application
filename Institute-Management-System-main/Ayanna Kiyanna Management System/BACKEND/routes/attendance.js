//import router package
const router = require("express").Router();
let Attendance = require("../models/Attendance");

router.route("/add").post((req, res) => {
  const classid = req.body.classid;
  const date = req.body.date;
  const totalStudents = req.body.totalStudents;
  const attendance = req.body.attendance;
  const link = req.body.link;

  const newAttendance = new Attendance({
    classid,
    date,
    totalStudents,
    attendance,
    link,
  });

  //Add Attendance

  //Javascript promise(like if else)
  newAttendance
    .save()
    .then(() => {
      res.json("Attendance Added"); //send the message as json format
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Attendance

router.route("/getAttendance").get((req, res) => {
  Attendance.find()

    .then((Attendance) => {
      res.json(Attendance);
    })

    .catch((err) => {
      console.log(err);
    });
});

//Fetch one class

router.route("/oneClass/:id").get(async (req, res) => {
  const user = await Attendance.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

// Update Attendance

router.route("/update/:id").put(async (req, res) => {
  const user = await Attendance.findById(req.params.id);

  if (user) {
    user.classid = req.body.classid || user.classid;
    user.date = req.body.date || user.date;
    user.totalStudents = req.body.totalStudents || user.totalStudents;
    user.attendance = req.body.attendance || user.attendance;
    user.link = req.body.link || user.link;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,

      classid: updatedUser.classid,
      date: updatedUser.date,
      totalStudents: updatedUser.totalStudents,
      attendance: updatedUser.attendance,
      link: updatedUser.link,
    });
  } else {
    res.status(404);

    throw new Error("Class Not Found");
  }
});

//Delete Attendance

router.route("/delete/:classid").delete(async (req, res) => {
  let GNumber = req.params.classid;

  Attendance.findOneAndDelete({ classid: GNumber })
    .then((addclass) => res.send(addclass))

    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
