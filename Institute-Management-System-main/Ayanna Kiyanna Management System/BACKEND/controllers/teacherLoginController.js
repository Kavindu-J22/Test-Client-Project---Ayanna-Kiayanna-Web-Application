const asyncHandler = require("express-async-handler");
const Teacher = require("../models/teacherModel");
const generateToken = require("../utils/techerToken");

const authTeacher = asyncHandler(async (req, res) => {
  const { email, firstPW } = req.body;

  const user = await Teacher.findOne({ email });

  if (user && (await Teacher.findOne({firstPW}))) {
    res.json({
      _id: user._id,

      fName: user.fName,

      lName: user.lName,

      mobileNo: user.mobileNo,

      email: user.email,

      token: generateToken(user._id),

      msg: "Login Successfull" 
    });
      
      
  } else if (!user) throw new Error("Invalid Email!");
  else !firstPW;

  throw new Error("Invalid Password!");
});

module.exports = { authTeacher };