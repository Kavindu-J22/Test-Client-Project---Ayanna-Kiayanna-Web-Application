import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentViewcss.css";
import Header from "../../components/Header/Header";


export default function ListClass() {
  const [searchGrade, setsearchGrade] = useState("");
  const [searchSubject, setsearchSubject] = useState("");
  const [searchTeacher, setsearchTeacher] = useState("");
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
        .get("http://localhost:5000/StudentClasses/getStudentClass")
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

 

  const renderClass = (classes, index) => {
    return (
      <tr key={index}>
        <td>{classes.Grade}</td>
        <td>{classes.StartTime}</td>
        <td>{classes.EndTime}</td>
        <td>{classes.SubjectNo}</td>
        <td>{classes.SubjectName}</td>
        <td>{classes.TeacherName}</td>
        <td>
          <a href={classes.Link}>
            <button className="buttonContent buttonContent2">Attend Class</button>
          </a>
        </td>
        <td>
          <a href={classes.content}>
            <button className="buttonContent buttonContent1">Download</button>
          </a>
        </td>
      </tr>
    );
  };

  return (
    <div className="newUser">
      <Header />
      <div className="card-heading">
        <h2 className="title">Attend to the Class</h2>
      </div>
      <div>
        <input
          placeholder="search grade"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchGrade(event.target.value)}
        />
        <input
          placeholder="search Subject"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchSubject(event.target.value)}
        />
        <input
          placeholder="search Teacher"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchTeacher(event.target.value)}
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
                <th>Link</th>
                <th>Component</th>
              </tr>
            </thead>
            <tbody>
              {classes
                .filter((val) => {
                  if (
                    (searchGrade === "")
                  )
                    return val;
                  else if (
                    (val.Grade.toLowerCase().includes(
                      searchGrade.toLowerCase()
                    ),
                    val.SubjectName.toLowerCase().includes(
                      searchSubject.toLowerCase()
                    ),
                    val.TeacherName.toLowerCase().includes(
                      searchTeacher.toLowerCase()
                    ))
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
