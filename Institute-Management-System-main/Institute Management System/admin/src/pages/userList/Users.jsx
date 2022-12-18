import "./users.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button } from "@material-ui/core";

export default function UserList({ search, setSearch }) {
  const [students, setStudents] = useState([
    {
      studentid: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      school: "",
      grade: "",
    },
  ]);

  let history = useHistory();

  useEffect(() => {
    function getDetails() {
      axios

        .get("http://localhost:8070/student/studentDetails")

        .then((res) => {
          console.log(res.data);

          setStudents(res.data);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getDetails();
  }, []);

  function deleteHandler(email) {
    axios
      .delete(`http://localhost:8070/student/deleteStudent/${email}`)

      .then((res) => {
        alert("User Deleted!");

        history.push("/users");
      })

      .catch();
  }

  const renderSDetails = (students, index) => {
    return (
      <tr key={index}>
        <td>{students.studentid} </td>

        <td>{students.name} </td>

        <td>{students.email} </td>

        <td>{students.phone} </td>

        <td>{students.grade} </td>

        <td>
          <Link to={`/user/${students._id}`}>
            <Button
              style={{
                fontSize: "12px",
                marginRight: "10px",
                color: "white",
                backgroundColor: "#04AA6D",
                textDecoration: "none",
                marginTop: "-15px",
                
              }}
            >
              Update
            </Button>
          </Link>
          <DeleteForeverIcon
            onClick={() => deleteHandler(students.email)}
            style={{ fontSize: "25px", color: "red", marginTop: "10px" }}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="userList">
      <div className="titleList">Registered Students List</div>
      <br />

      {/* <input
        placeholder="Search Student ID"
        className="Ddown"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      <div className="table-wrapper">
        <table className="fl-table">
          <thead className="tHead">
            <tr>
              <th>Student ID</th>

              <th>Full Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Grade</th>

              <th style={{ width: "90px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {students
              ?.reverse()
              // .filter((filteredStudents) =>
              //   filteredStudents.studentid
              //     .toLowerCase()
              //     .includes(search.toLowerCase())
              // )
              .map(renderSDetails)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
