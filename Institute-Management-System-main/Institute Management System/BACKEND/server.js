
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Assign into localhost ports
const PORT = process.env.PORT || 5000;

//Json Methods
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Database Connection
const URL = process.env.MONGODB_URL;


//routes
// app.use("/user", require("./routes/userRouter"));
// app.use("/api", require("./routes/upload"));
app.use("/teacher", require("./routes/resultRoute"));

app.use("/AddClasses", require("./routes/addclass"));
app.use("/RejectClasses", require("./routes/rejectclass"));
//payment route
app.use("/getfees", require("./routes/feeRoute"));
app.use("/payment", require("./routes/payments"));
app.use("/online", require("./routes/onlinepayments"));
app.use("/rejectpayment", require("./routes/RejectPayRoute"));

//app.use("/AddClasses", require("./routes/addclass"));
//app.use("/RejectClasses", require("./routes/rejectclass"));
app.use("/TimeTable", require("./routes/timetable"));
app.use("/StudentClasses", require("./routes/studentclassview"));




app.use("/teacherlog", require("./routes/teacherLoginRoute"));



//MongoDB configurations

mongoose.connect(URL, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});

//Mongoose Connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Successful!");
});

//Access to students.js route
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

//http://localhost:5000/student
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// app.use(notFound);
app.use(errorHandler);

//routes
// app.use("/api", require("./routes/upload"));

//app.use("/teacher", require("./routes/resultRoute"));

app.use("/exam", require("./routes/examRoute"));
app.use("/answer", require("./routes/answerSubmit"));

app.use("/AddClasses", require("./routes/addclass"));
app.use("/RejectClasses", require("./routes/rejectclass"));
//payment route
app.use("/getfees", require("./routes/feeRoute"));
app.use("/payment", require("./routes/payments"));

//Attendance routes
app.use("/attendance", require("./routes/attendance"));


//Run on port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
