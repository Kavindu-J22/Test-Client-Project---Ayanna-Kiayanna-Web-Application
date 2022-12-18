import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewAttendance.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import Header from "../../components/Headers/TeacherHeader/tHeader";

export default function ViewAttendance({ search, setSearch }) {
  //get attendance from database

  const [viewAttendance, setViewAttendance] = useState([
    {
      classid: "",
      date: "",
      totalStudents: "",
      attendance: "",
      link: "",
    },
  ]);

  useEffect(() => {
    function getAttendance() {
      axios
        .get("http://localhost:5000/attendance/getAttendance")
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

  function onDelete(classid) {
    axios
      .delete(`http://localhost:5000/attendance/delete/${classid}`)
      .then((res) => {
        console.log(res);
        alert("Class Attendance Deleted!");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const renderAttendance = (viewAttendance, index) => {
    return (
      <tr key={index}>
        <td>{viewAttendance.classid} </td>
        <td>{viewAttendance.date} </td>
        <td>{viewAttendance.totalStudents} </td>
        <td>{viewAttendance.attendance} </td>
        <td>{viewAttendance.link} </td>

        <td>
          <>
            <Link to={`/teacher/editAttendance/${viewAttendance._id}`}>
              <CreateIcon
                style={{
                  fontSize: "50px",
                  marginRight: "20px",
                  color: "orange",
                }}
              />
            </Link>

            <DeleteForeverIcon
              onClick={() => onDelete(viewAttendance.classid)}
              style={{ fontSize: "50px", color: "red" }}
            />
          </>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className="title">Attendance List</h2>
        <input
          placeholder="Search Class ID"
          className="Ddown"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Class ID</th>
                <th>Date</th>
                <th>Total Students</th>
                <th>Attendance</th>
                <th>Attendance Sheet Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewAttendance
                // ?.reverse()
                // .filter((filteredAttendance) =>
                //   filteredAttendance.classid
                //     .toLowerCase()
                //     .includes(search.toLowerCase())
                // )
                .map(renderAttendance)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
