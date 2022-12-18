import "./Teacher.css";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import NavigatePdf from "./teacherReport";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";


export default function ShowTeacher() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    function getTeachers() {
      axios
        .get("http://localhost:8070/teacher/")
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTeachers();
  }, []);

  //Search bar implementation
  const [searchTerm, setSearchTerm] = useState("");

  const renderData = (data, index) => {
    return (
      
        <tr key={index}>
          <td>{data.regNo}</td>
          <td>
            {data.fName} {data.lName}
          </td>
          <td>{data.classId}</td>
          <td>{data.mobileNo}</td>
          <td>{data.email}</td>
          <td>
            <Link to={"/teacher/update/" + data._id}>
              {" "}
              <CreateIcon
                style={{
                  fontSize: "30px",
                  color: "orange",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            </Link>
            <Link to={"/teacher/delete/" + data._id}>
              {" "}
              <DeleteForeverIcon
                style={{
                  fontSize: "30px",
                  color: "red",
                  cursor: "pointer",
                }}
              />{" "}
            </Link>
          </td>
        </tr>
    );
  };

  //navigation to add teacher page
  const history = useHistory();
  const navigateToAddTeacher = () => history.push("/teacher/add");


  return (
    <div className="flecContainer">
      <h1>Teachers' Details</h1>
      {/*Search bar */}
      <div className="searchBar">
        <TextField
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="btnContainer">
        <div className="addBtn">
          <button className="addBtn-Btn" onClick={navigateToAddTeacher}>
            <AddCircleIcon />
            <span>Add a Teacher</span>
          </button>
        </div>
        <div className="reportBtn">
          <button className="reportBtn-Btn" onClick={NavigatePdf}>
            <FileCopyIcon />
            <span>Genarate a Report</span>
          </button>
        </div>
      </div>

      <table className="tableStyle" id="content">
        <thead className="tHead">
          <tr>
            <th>Registration No.</th>
            <th>Teacher Name</th>
            <th>Class ID</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="tableRaw">
          {details
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.fName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map(renderData)}
        </tbody>
      </table>
    </div>
  );
}
