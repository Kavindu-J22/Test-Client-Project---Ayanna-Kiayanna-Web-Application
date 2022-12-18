//Constant variable declaration and assign dependencies. It means import the packages and assign to the constant variable.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//Assign server port number to the constant variable PORT.
const PORT = process.env.PORT || 8070;

app.use(cors()); //use 'cors' variable
app.use(bodyParser.json()); //json means key-value pairs

//Get the stored Database Link in '.env'
const URL = process.env.MONGODB_URL;

//Do configurations in related to MONGO_DB
//Pass two paramenters 'URL' and 'options'
mongoose.connect(URL, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});

//Make connection
const connection = mongoose.connection;
//once means we are connect only once
//open = open the connection that we make
connection.once("open", () => {
  console.log("Mongodb Connection Success!!!"); //Console output
});

const attendanceRouter = require("./routes/supattendance");
app.use("/supattendance", attendanceRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
