import React from "react";

import { useState, useEffect } from "react";
import "./resultList.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import Deletebtn from "./deleteBtn";

function ResultList() {
  // get results from database

  const [results, setResults] = useState([
    {
      examname: "",
      name: "",
      studentID: "",
      result: "",
      grade: "",
    },
  ]);

  useEffect(() => {
    function getResults() {
      axios
        .get("http://localhost:5000/teacher/getResults")
        .then((res) => {
          // console.log(res);
          setResults(res.data);
        })
        .catch((err) => {
          alert(err.message);
        }, []);
    }

    getResults();
  });
  //******************************

  const renderResults = (results, index) => {
    return (
      <tr key={index}>
        <td>{results.examname}</td>
        <td>{results.studentID}</td>
        <td>{results.name}</td>
        <td>{results.result}</td>
        <td>{results.grade}</td>
        <td>
          <>
            {" "}
            <Link to={`/teacher/res/edit/${results._id}`}>
              <CreateIcon
                style={{
                  fontSize: "30px",
                  color: "orange",
                  marginRight: "-10px",
                  float: "left",
                }}
              />
            </Link>
          </>
          <Deletebtn sid={results._id} />
         
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
        <h2 style={{ padding: "5px" }}>Result List</h2>
      </div>

      <div
        style={{ marginLeft: "150px", marginRight: "190px", marginTop: "20px" }}
      >
     

        <label
          style={{
            paddingRight: "21px",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          Exam Name
        </label>
        <input type="text" name="examname" />
      </div>

      {/* result table */}
      <ReactBootStrap.Table
        striped
        bordered
        hover
        style={{ marginLeft: "150px", width: "80%", marginTop: "20px" }}
      >
        <thead className="tHead">
          <tr>
            <th>Exam Name</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Result</th>
            <th>Grade</th>
            <th style={{ width: "80px" }}>Action</th>
          </tr>
        </thead>
        <tbody>{results.map(renderResults)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default ResultList;
