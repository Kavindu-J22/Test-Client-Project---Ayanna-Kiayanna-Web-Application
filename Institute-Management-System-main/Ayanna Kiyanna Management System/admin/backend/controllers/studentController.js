const asyncHandler = require("express-async-handler");
const User = require("../models/student");

//Student Registration by admin
const registerUser = asyncHandler(async (req, res) => {
  const {
    studentid,
    password,
    name,
    email,
    birthday,
    phone,
    parentname,
    home,
    address,
    school,
    male,
    female,
    grade,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }
  const userIdExists = await User.findOne({ studentid });

  if (userIdExists) {
    res.status(400);
    throw new Error("Student ID Already Exists!");
  }
  if (
    !studentid ||
    !password ||
    !name ||
    !email ||
    !phone ||
    !address ||
    !school ||
    !grade
  ) {
    res.status(400);
    throw new Error("Please Fill all the fields!");
  }

  const user = await User.create({
    studentid,
    password,
    name,
    email,
    birthday,
    phone,
    parentname,
    home,
    address,
    school,
    male,
    female,
    grade,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      studentid: user.studentid,
      password: user.password,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone,
      parentname: user.parentname,
      home: user.home,
      address: user.address,
      school: user.school,
      male: user.male,
      female: user.female,
      grade: user.female,
      //   token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

//Get all students details
const getStudents = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.json(user);
});

//Fetch one student
const getStudentById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

//Update Student Details
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.studentid = req.body.studentid || user.studentid;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.school = req.body.school || user.school;
    user.grade = req.body.grade || user.grade;
    user.pic = req.body.pic || user.pic;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      studentid: updatedUser.studentid,
      password: updatedUser.password,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      parentname: updatedUser.parentname,
      home: updatedUser.home,
      address: updatedUser.address,
      school: updatedUser.school,
      male: updatedUser.male,
      female: updatedUser.female,
      grade: updatedUser.grade,
      // token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Delete a student

const DeleteStudent = asyncHandler(async (req, res) => {
  let SEmail = req.params.email;

  await User.findOneAndDelete({ email: SEmail })
    .then(() => {
      res.status(200).send({ status: "User deleted!" });
    })
    .catch((err) => {
      res.status(500).send({ status: "User not found!" });
    });
});

module.exports = {
  registerUser,
  getStudents,
  getStudentById,
  updateUserDetails,
  DeleteStudent,
};
