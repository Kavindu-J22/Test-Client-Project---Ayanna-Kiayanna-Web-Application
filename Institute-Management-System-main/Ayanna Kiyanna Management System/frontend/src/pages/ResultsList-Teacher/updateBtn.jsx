import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import { useParams } from "react-router";
//import Alert from "@mui/material/Alert";

function UpdateBtn() {
  const { _id } = useParams();
  //console.log(_id);

  const [examname, setExamName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [grade, setGrade] = useState("");

  // const [pop, setpop] = React.useState(false);

  // const [add, setadd] = React.useState(false);

  // const handleClose = () => {
  //   setpop(false);

  //   setadd(false);
  // };

  useEffect(() => {
    getResults();
  }, []);

  function getResults() {
    let mounted = true;
    fetch(`http://localhost:5000/teacher/getResults/${_id}`)
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setExamName(result[0].examname);
          setStudentID(result[0].studentID);
          setName(result[0].name);
          setResult(result[0].result);
          setGrade(result[0].grade);

          //console.log(result);
        }
      });
    return () => (mounted = false);
  }

  const updateHandler = (event) => {
    //event.preventDefault();
    const updatee = { examname, studentID, name, result, grade };

    axios
      .put(`http://localhost:5000/teacher/results/update/${_id}`, updatee)
      .then((res) => {
        alert("OK");
      })
      .catch((err) => {
        alert("Failed");
      });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          marginLeft: "40%",
          marginTop: "50px",
          backgroundColor: "teal",
          width: "350px",
          paddingLeft: "60px",
          height: "530px",
          fontSize: "20px",
          color: "white",
        }}
      >
        <form onSubmit={updateHandler}>
          <label style={{ marginTop: "50px" }}>Exam name</label>
          <br />
          <input
            type="text"
            placeholder="exam name"
            value={examname}
            onChange={(e) => {
              setExamName(e.target.value);
            }}
          />
          <br />

          <label>Student Name</label>
          <br />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />

          <label>Student ID</label>
          <br />
          <input
            type="text"
            placeholder="studentId"
            value={studentID}
            onChange={(e) => {
              setStudentID(e.target.value);
            }}
          />
          <br />

          <label>Result</label>
          <br />
          <input
            type="text"
            placeholder="results"
            value={result}
            onChange={(e) => {
              setResult(e.target.value);
            }}
          />
          <br />

          <label>Grade</label>

          <br />
          <input
            type="text"
            placeholder="grade"
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          />
          <br />

          <button
            style={{
              marginTop: "20px",
              marginLeft: "45px",
              backgroundColor: "#FFAF0F",
              width: "150px",
              height: "40px",
              color: "white",
              fontSize: "20px",
            }}
            type="submit"
          >
            Update
          </button>
        </form>

        {/* <Snackbar open={pop} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            No Allowance Given
          </Alert>
        </Snackbar>

        <Snackbar open={add} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Allowance Has Been Added
          </Alert>
        </Snackbar> */}
      </div>
    </div>
  );
}
export default UpdateBtn;
