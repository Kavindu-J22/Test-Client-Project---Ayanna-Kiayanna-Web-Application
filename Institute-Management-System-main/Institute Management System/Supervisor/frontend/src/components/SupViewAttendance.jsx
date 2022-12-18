import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./SupAttendance.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";

export default function ViewSupAttendance({ search, setSearch }) {
  //get attendance from database

  const [viewAttendance, setViewAttendance] = useState([
    {
      date: "",
      classid: "",
      studentid: "",
      name: "",
      grade: "",
      subject: "",
    },
  ]);

  useEffect(() => {
    function getAttendance() {
      axios
        .get("http://localhost:8070/supattendance/getAttendance")
        .then((res) => {
          console.log(res.data);
          setViewAttendance(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAttendance();
  }, []);

  function onDelete(studentid) {
    axios
      .delete(`http://localhost:8070/supattendance/delete/${studentid}`)
      .then((res) => {
        console.log(res);
        alert("Student's Attendance Deleted!");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const renderAttendance = (viewAttendance, index) => {
    return (
      <tr key={index}>
        <td>{viewAttendance.date} </td>
        <td>{viewAttendance.classid} </td>
        <td>{viewAttendance.studentid} </td>
        <td>{viewAttendance.name} </td>
        <td>{viewAttendance.grade} </td>
        <td>{viewAttendance.subject} </td>
        <td>
          <>
            <Link to={`/user/${viewAttendance._id}`}>
              <CreateIcon
                style={{
                  fontSize: "50px",
                  marginRight: "20px",
                  color: "orange",
                }}
              />
            </Link>

            <DeleteForeverIcon
              onClick={() => onDelete(viewAttendance.studentid)}
              style={{ fontSize: "50px", color: "red" }}
            />
          </>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="title">Attendance List</h2>
      <input
        placeholder="Search Student ID"
        className="Ddown"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Class ID</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewAttendance
              ?.reverse()
              .filter((filteredAttendance) =>
                filteredAttendance.studentid
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map(renderAttendance)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
