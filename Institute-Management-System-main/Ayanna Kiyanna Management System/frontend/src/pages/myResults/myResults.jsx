import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import img from "../../assets/images/resimg.png";

import { useDispatch, useSelector } from "react-redux";

function MyResults() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();


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
          //console.log(res);
          setResults(res.data);
        })
        .catch((err) => {
          alert(err.message);
        }, []);
    }

    getResults();
  }, []);
  //******************************.
  const renderResults = (results, index) => {
    return (
      <tr key={index}>
        <td>{results.studentID}</td>
        <td>{results.name}</td>
        <td>{results.result}</td>
        <td>{results.grade}</td>
      </tr>
    );
  };

  return (
    <div>
      <Header />
      <div
        style={{ marginLeft: "850px", marginTop: "50px", position: "absolute" }}
      >
        <img
          src={img}
          alt="img"
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            opacity: "0.5",
          }}
        />
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            width: "200px",
            height: "130px",
            textAlign: "center",
            marginTop: "170px",
            marginLeft: "150px",
            border: "1px solid",
          }}
        >
          <h3>My Result</h3>
        {/* <h1>{userInfo?.email}</h1> */}
          <br />
          <h3>{results.result}</h3>
        </div>
      </div>

      <h2 style={{ marginTop: "40px", marginLeft: "50px" }}>Select exam</h2>
      

      {/* result table */}
      <div style={{ overflowY: "scroll", height: "400px" }}>
        <ReactBootStrap.Table
          striped
          bordered
          hover
          style={{
            marginLeft: "70px",
            width: "40%",
            marginTop: "40px",
          }}
        >
          <thead style={{ position: "relative" }} className="tHead">
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Result</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>{results.map(renderResults)}</tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
}

export default MyResults;
