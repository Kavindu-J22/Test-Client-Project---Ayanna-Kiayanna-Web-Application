import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rejectClassCss.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import { Link } from "react-router-dom"

// import {Link} from 'react-router-dom'

export default function ListClass() {
  // delete row
  const [search, setsearch] = useState("");

  function onDelete(SubjectNo) {
    axios
      .delete(`http://localhost:5000/RejectClasses/delete/${SubjectNo}`)
      .then((res) => {
        console.log(res.data.StartTime);
        alert("Delete Class");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

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
        .get("http://localhost:5000/RejectClasses/get")
        .then((res) => {
          console.log(res);
          setclasses(res.data);
          // setRClass(res.data);
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
        <td>{classes.Grade}</td>
        <td>{classes.StartTime}</td>
        <td>{classes.EndTime}</td>
        <td>{classes.SubjectNo}</td>
        <td>{classes.SubjectName}</td>
        <td>{classes.TeacherName}</td>
        <td>{classes.Link}</td>
        <td>
          <Link to={`/teacher/up/${classes.SubjectNo}`}>
          <UpdateIcon
            className="UpdateIcon"
            style={{
              fontSize: "30px",
              marginRight: "10px"
            }}
          />
          </Link>
          <DeleteForeverIcon
            className="DeleteIcon"
            onClick={() => onDelete(classes.SubjectNo)}
            style={{ fontSize: "30px"}}
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Header />

      <div className="card-heading">
        <h2 className="title">Rejected Classes</h2>
      </div>

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
              <th>Link</th>
              {/* <th>Comment</th> */}
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
  );
}
