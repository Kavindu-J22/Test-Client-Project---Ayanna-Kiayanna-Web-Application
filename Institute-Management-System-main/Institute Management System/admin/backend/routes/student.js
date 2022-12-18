const router = require("express").Router();
const {
  registerUser,
  getStudents,
  updateUserDetails,
  DeleteStudent,
  getStudentById,
} = require("../controllers/studentController");

router.route("/add").post(registerUser);

router.route("/studentDetails").get(getStudents);

router.route("/getOneStudent/:id").get(getStudentById);

router.route("/studentUpdate/:id").put(updateUserDetails);

router.route("/deleteStudent/:email").delete(DeleteStudent);

module.exports = router;
