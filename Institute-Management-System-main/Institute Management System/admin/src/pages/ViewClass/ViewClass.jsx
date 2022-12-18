import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewClassCss.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default function ListClass() {
  const [search, setsearch] = useState("");
  //get data from getdata

  // get results from database

  const [classes, setclasses] = useState([
    {
      Grade: "",
      StartTime: "",
      EndTime: "",
      SubjectNo: "",
      SubjectName: "",
      TeacherName: "",
      Link: "",
      content: "",
    },
  ]);



  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:8070/AddClasses/getAddClass")
        .then((res) => {
          console.log(res);
          setclasses(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getclasses();
  }, []);
  //******************************
  //send class data to student

  function sendDataStudent(
    Grade,
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content
  )
  {
    console.log(SubjectNo);
    axios
      .delete(`http://localhost:8070/AddClasses/deleteAddClass/${SubjectNo}`)
      .then((res) => {
        alert("Class Deleted");
      })
      .catch((err) => {
        alert(err.message);
      });

    const NewClass = {
      Grade,
      StartTime,
      EndTime,
      SubjectNo,
      SubjectName,
      TeacherName,
      Link,
      content,
    };
    axios
      .post("http://localhost:8070/StudentClasses/addStudentClass", NewClass)
      .then(() => {
        alert("Class Send to Student");
      })
      .catch((err) => {
        alert(err);
      });
  }

  //send reject data to teacher
  function sendData(
    Grade,
    StartTime,
    EndTime,
    SubjectNo,
    SubjectName,
    TeacherName,
    Link,
    content
  ) {
    console.log(SubjectNo);
    axios
      .delete(`http://localhost:8070/AddClasses/deleteAddClass/${SubjectNo}`)
      .then((res) => {
        alert("Class Deleted");
      })
      .catch((err) => {
        alert(err.message);
      });

    const NewClass = {
      Grade,
      StartTime,
      EndTime,
      SubjectNo,
      SubjectName,
      TeacherName,
      Link,
      content,
    };
    axios
      .post("http://localhost:8070/RejectClasses/addRejectClass", NewClass)
      .then(() => {
        alert("Class Rejected");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const renderClass = (classes, index) => {
    //calculation
    const a = parseInt(classes.StartTime);
    const b = parseInt(classes.EndTime);
    const duration = (b-a);
    return (
      <tr key={index}>
        <td>{classes.Grade}</td>
        <td>{classes.StartTime}</td>
        <td>{classes.EndTime}</td>
        <td>{classes.SubjectNo}</td>
        <td>{classes.SubjectName}</td>
        <td>{classes.TeacherName}</td>
        <td>{duration}hr</td>
        <td>
          <a href={classes.Link}>
            <button className="buttonContent buttonContent2">Check Link</button>
          </a>
        </td>
        <td>
          <a href={classes.content}>
            <button className="buttonContent buttonContent1">
              View Content
            </button>
          </a>
        </td>
        <td>
          <CheckCircleIcon
            className="CheckIcon"
            style={{
              fontSize: "30px",
              marginRight: "10px",
            }}
            onClick={() =>
              sendDataStudent(
                classes.Grade,
                classes.StartTime,
                classes.EndTime,
                classes.SubjectNo,
                classes.SubjectName,
                classes.TeacherName,
                classes.Link,
                classes.content
              )
            }
          />
          <CancelIcon
            className="CancelIcon"
            style={{
              fontSize: "30px",
            }}
            onClick={() =>
              sendData(
                classes.Grade,
                classes.StartTime,
                classes.EndTime,
                classes.SubjectNo,
                classes.SubjectName,
                classes.TeacherName,
                classes.Link,
                classes.content
              )
            }
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="newUser">
      <div className="card-heading">
        <h2 className="title">View Class</h2>
      </div>
      <div>
        <input
          placeholder="search grade"
          className="Ddown"
          type="text"
          onChange={(event) => setsearch(event.target.value)}
        />

        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Class ID</th>
                <th>Subject Name</th>
                <th>Theacher Name</th>
                <th>Time duration</th>
                <th>Link</th>
                <th>Component</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes
                .filter((val) => {
                  if (search === "") return val;
                  else if (
                    val.Grade.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map(renderClass)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
