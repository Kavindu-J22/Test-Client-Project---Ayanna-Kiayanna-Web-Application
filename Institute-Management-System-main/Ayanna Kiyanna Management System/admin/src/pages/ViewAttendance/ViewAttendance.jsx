import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewAttendance.css";

export default function ViewAttendance({ search, setSearch }) {
  //get attendance from database

  const componentRef1 = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef1.current,
  });

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
        .get("http://localhost:8070/attendance/getAttendance")
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

  const renderAttendance = (viewAttendance, index) => {
    return (
      <tr key={index}>
        <td>{viewAttendance.date} </td>
        <td>{viewAttendance.classid} </td>
        <td>{viewAttendance.studentid} </td>
        <td>{viewAttendance.name} </td>
        <td>{viewAttendance.grade} </td>
        <td>{viewAttendance.subject} </td>
      </tr>
    );
  };

  return (
    <div className="newUser">
      <h2 className="title">Attendance List</h2>
      <input
        placeholder="Search Date"
        className="Ddown2"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="reportBtn1"
        onClick={handlePrint}
        style={{
          fontSize: "15px",
          marginRight: "100px",
          color: "white",
          backgroundColor: "grey",
          textDecoration: "none",
          marginTop: "0px",
          padding: "3px",
        }}
      >
        Download a PDF
      </button>

      <div className="table-wrapper">
        <div ref={componentRef1}>
          <table className="fl-table321">
            <thead>
              <tr>
                <th>Date</th>
                <th>Class ID</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Grade</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {viewAttendance
                ?.reverse()
                .filter((filteredAttendance) =>
                  filteredAttendance.date
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map(renderAttendance)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
