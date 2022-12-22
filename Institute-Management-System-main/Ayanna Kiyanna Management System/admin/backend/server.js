//Variable decleration
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Assign into localhost ports
const PORT = process.env.PORT || 8070;

//Json Methods
app.use(cors());
app.use(bodyParser.json());

//Database Connection
const URL = process.env.MONGODB_URL;

//MongoDB configurations
mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Mongoose Connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Successful!");
});

//Access to students.js route
const studentRouter = require("./routes/student");

//http://localhost:8070/student
app.use("/student", studentRouter);

//teacherManage routes
app.use("/teacher", require("./routes/teachersRoute"));

const staffRouter = require("./routes/addstaff");
const staffallowance = require("./routes/addallowance");
const staffpaysalary = require("./routes/paysalary");

//http://localhost:8070/student
app.use("/student", studentRouter);

app.use("/RejectClasses", require("./routes/rejectclass"));
app.use("/AddClasses", require("./routes/adminaddclass"));
app.use("/StudentClasses", require("./routes/studentviewclass"));

app.use("/staff", staffRouter);

app.use("/attendance", require("./routes/viewattendance"));

app.use("/payment", require("./routes/payments"));
app.use("/rejectpayments", require("./routes/rejectPaymentRoute"));
app.use("/online", require("./routes/onlinePayRoute"));

app.use("/TimeTable", require("./routes/timetable"));

app.use("/staffallowance", staffallowance);
app.use("/staffpaysalary", staffpaysalary);

//Run on port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
