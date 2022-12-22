import React from "react";
import Popup from "../../components/Popup/AddExamPop/addExamPop";
import { useState, useEffect } from "react";
import "./examList.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import * as ReactBootStrap from "react-bootstrap";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import axios from "axios";
import Deletebtn from "./deleteBtn";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

function ExamList() {
  const [buttonPopUp, setButtonPopUp] = useState(false);

  //get inputs
  const [ExamName, setExamName] = useState("");
  const [ClassID, setClassID] = useState("");
  const [Date, setDate] = useState("");
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");
  const [Type, setType] = useState("");
  const [content, setComponent] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  //send photo to cloud
  const postDetails = (pics) => {
    if (!pics) {
      return setComponent("Please Select an Image");
    }
    setComponent(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "GlobalEducation");
      data.append("cloud_name", "desnqqj6a");
      fetch("https://api.cloudinary.com/v1_1/desnqqj6a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComponent(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setComponent("Please select an Image");
    }
  };

  function sendData(e) {
    // e.preventDefault();

    const NewClass = new FormData();
    NewClass.append("examname", ExamName);
    NewClass.append("classID", ClassID);
    NewClass.append("type", Type);
    NewClass.append("date", Date);
    NewClass.append("start", Start);
    NewClass.append("end", End);
    NewClass.append("content", content);

    axios
      .post("http://localhost:5000/exam/addExam", NewClass)
      .then((res) => {
        alert("Exam Added");
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  }

  //**************************

  // get exams from database

  const [exams, setExam] = useState([
    {
      examname: "",
      classID: "",
      type: "",
      date: "",
      start: "",
      end: "",
      content: "",
    },
  ]);

  useEffect(() => {
    function getExams() {
      axios
        .get("http://localhost:5000/exam/getExams/")
        .then((res) => {
          console.log(res);
          setExam(res.data);
        })
        .catch((err) => {
          alert(err.message);
        }, []);
    }

    getExams();
  }, []);
  //******************************

  const renderExams = (exams, index) => {
    return (
      <tr key={index}>
        <td>{exams.examname}</td>
        <td>{exams.classID}</td>
        <td>{exams.type}</td>
        <td>{exams.date}</td>
        <td>{exams.start}</td>
        <td>{exams.end}</td>
        <td>
          <a href={exams.content}>
            {" "}
            <button> Paper</button>
          </a>
        </td>
        <td>
          <Link to={`/exam/edit/${exams._id}`}>
            <CreateIcon
              onClick={() => setButtonPopUp(true, exams._id)}
              style={{ fontSize: "30px", color: "#FFAF0F", float: "right" }}
              type="submit"
            />
          </Link>

          <Deletebtn examname={exams.examname} />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Header />
      <div
        style={{
          background: "#8CA6FE",
          marginTop: "20px",
          height: "50px",
          width: "80%",
          marginLeft: "150px",
          color: "white",
        }}
      >
        <h2 style={{ padding: "5px" }}>Exam List</h2>
      </div>

      <div
        style={{ marginLeft: "150px", marginRight: "190px", marginTop: "20px" }}
      >
        {/* add button */}

        <AddCircleIcon
          onClick={() => setButtonPopUp(true)}
          style={{
            fontSize: "40px",
            color: "#27AE60",
            float: "right",
            marginTop: "-15px",
          }}
        />
      </div>

      {/* result table */}
      <ReactBootStrap.Table
        striped
        bordered
        hover
        style={{ marginLeft: "150px", width: "80%", marginTop: "50px" }}
      >
        <thead className="tHead">
          <tr>
            <th>Exam Name</th>
            <th>Class ID</th>
            <th>Exam type</th>
            <th>Exam Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th> Paper</th>
            <th style={{ width: "90px" }}>Action</th>
          </tr>
        </thead>
        <tbody>{exams.map(renderExams)}</tbody>
      </ReactBootStrap.Table>

      {/* add exam popup */}
      <Popup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        <h3 style={{ textAlign: "center" }}>Add Exam</h3>
        <hr />
        <form onSubmit={sendData}>
          <label>Exam name</label>
          <br />
          <input
            onChange={(e) => {
              setExamName(e.target.value);
            }}
            name="examname"
            className="inputArea"
            type="text"
            style={{ width: "450px" }}
          />
          <br />
          <br />

          <label>Class ID</label>

          <input
            onChange={(e) => {
              setClassID(e.target.value);
            }}
            name="classID"
            className="inputArea"
            type="text"
            style={{ marginLeft: "60px", width: "250px" }}
          />
          <br />
          <br />

          <label>Exam Type</label>
          <input
            onChange={(e) => {
              setType(e.target.value);
            }}
            name="type"
            //value={input.type}
            className="inputArea"
            type="text"
            style={{ marginLeft: "40px", width: "250px" }}
          />
          <br />
          <br />

          <label>Choose Date</label>
          <input
            onChange={(e) => {
              setDate(e.target.value);
            }}
            name="date"
            //value={input.date}
            className="inputArea"
            type="date"
            style={{ marginLeft: "25px", width: "150px" }}
          />
          <br />
          <br />
          <label>Start Time</label>
          <input
            onChange={(e) => {
              setStart(e.target.value);
            }}
            name="start"
            //value={input.start}
            className="inputArea"
            type="time"
            style={{ marginLeft: "15px", width: "100px" }}
          />

          <label style={{ marginLeft: "20px" }}>End Time</label>
          <input
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            name="end"
            //value={input.end}
            className="inputArea"
            type="time"
            style={{ marginLeft: "15px", width: "100px" }}
          />
          <br />
          <br />
          <label style={{}}>Uplode Paper</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </Popup>
    </div>
  );
}

export default ExamList;
