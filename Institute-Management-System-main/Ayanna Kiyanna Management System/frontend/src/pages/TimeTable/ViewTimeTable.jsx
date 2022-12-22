import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewTimeTablecss.css";
import Header from "../../components/Header/Header";

export default function TimeTable() {

  const [search, setsearch] = useState("");


  // get results from database

  const [classes, setclasses] = useState([
    {
      Grade: "",
      StartTime: "",
      EndTime: "",
      Date: "",
      SubjectName: "",
      TeacherName: "",
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:5000/TimeTable/getTimeTable")
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

  const renderClass = (classes, id) => {
    return (
      <tr key={id}>
        <td>{classes.Date}</td>
        <td>{classes.Grade}</td>
        <td>{classes.StartTime}</td>
        <td>{classes.EndTime}</td>
        <td>{classes.SubjectName}</td>
        <td>{classes.TeacherName}</td>
      </tr>
    );
  };

  return (
    <div>
      <Header />

      <div className="card-heading">
        <h2 className="title">TimeTable</h2>
      </div>

      <input
        placeholder="search Date"
        className="Ddown"
        type="text"
        onChange={(event) => setsearch(event.target.value)}
      />
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Grade</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Subject Name</th>
              <th>Theacher Name</th>
            </tr>
          </thead>
          <tbody>
            {classes
              .filter((val) => {
                if (search === "") return val;
                else if (
                  val.Date.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map(renderClass)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
