import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import { useParams } from "react-router";
//import Alert from "@mui/material/Alert";

function UpdateBtn() {
  const { _id } = useParams();
  //console.log(_id);

  const [examname, setExamName] = useState("");
  const [classID, setClassID] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("");

  // const [pop, setpop] = React.useState(false);

  // const [add, setadd] = React.useState(false);

  // const handleClose = () => {
  //   setpop(false);

  //   setadd(false);
  // };

  useEffect(() => {
    getExam();
  }, []);

  function getExam() {
    let mounted = true;
    fetch(`http://localhost:5000/exam/getExams/${_id}`)
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setExamName(result[0].examname);
          setClassID(result[0].classID);
          setDate(result[0].date);
          setStart(result[0].start);
          setEnd(result[0].end);
          setType(result[0].type);

          //console.log(result[0].examname);
        }
      });
    return () => (mounted = false);
  }

  const updateHandler = (event) => {
    //event.preventDefault();
    const updatee = { examname, classID, date, start, end, type };
    axios
      .put(`http://localhost:5000/exam/update/${_id}`, updatee)
      .then((res) => {
        alert("OK");
      })
      .catch((err) => {
        alert("fuck");
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

          <label>Class ID</label>
          <br />
          <input
            type="text"
            placeholder="class"
            value={classID}
            onChange={(e) => {
              setClassID(e.target.value);
            }}
          />
          <br />

          <label>type</label>
          <br />
          <input
            type="text"
            placeholder="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <br />

          <label>date</label>
          <br />
          <input
            type="date"
            placeholder="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <br />

          <label>start</label>

          <br />
          <input
            type="time"
            placeholder="start"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
          <br />
          <label>end</label>
          <br />
          <input
            type="time"
            placeholder="end"
            value={end}
            onChange={(e) => {
              setStart(e.target.value);
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
