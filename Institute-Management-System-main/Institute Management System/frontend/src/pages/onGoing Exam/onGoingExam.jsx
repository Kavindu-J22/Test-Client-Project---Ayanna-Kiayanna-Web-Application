import React from "react";
import Header from "../../components/Header/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function OnGoingExam() {
  const classes = useStyles();

  // get exams from database

  const [exams, setExam] = useState([
    {
      examname: "",
      classID: "",
      type: "",
      date: "",
      start: "",
      end: "",
      content: "",
    },
  ]);

  useEffect(() => {
    function getExams() {
      axios
        .get("http://localhost:5000/exam/getExams")
        .then((res) => {
          // console.log(res);
          setExam(res.data);
        })
        .catch((err) => {
          alert(err.message);
        }, []);
    }

    getExams();
  },[]);

  const renderExams = (exams, index) => {
    return (
      <tr key={index}>
        <td>{exams.examname}</td>
        <td>{exams.classID}</td>
        <td>{exams.type}</td>
        <td>{exams.date}</td>
        <td>{exams.start}</td>
        <td>{exams.end}</td>

        <td>
          <div className={classes.root}>
            <Button disabled>Attempted</Button>
          </div>
        </td>
        <td>
          <div className={classes.root}>
            <Link
              to={{
                pathname: `/student/attempt/${exams._id}`,
                data: { exams },
              }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" color="secondary">
                Start Test
              </Button>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Header />
      <h3 style={{ marginTop: "60px", marginLeft: "50px" }}>
        {" "}
        On going examinations
      </h3>
      <ReactBootStrap.Table
        striped
        bordered
        hover
        style={{ marginLeft: "150px", width: "80%", marginTop: "50px" }}
      >
        <thead className="tHead">
          <tr>
            <th style={{ textAlign: "center" }}>Exam Name</th>
            <th style={{ textAlign: "center" }}>Class ID</th>
            <th style={{ textAlign: "center" }}>Exam type</th>
            <th style={{ textAlign: "center" }}>Exam Date</th>
            <th style={{ textAlign: "center", width: "150px" }}>Start Time</th>
            <th style={{ textAlign: "center", width: "150px" }}>End Time</th>
            <th style={{ textAlign: "center", width: "150px" }}>Status</th>
            <th style={{ textAlign: "center", width: "150px" }}>Attempt</th>
          </tr>
        </thead>
        <tbody>{exams.map(renderExams)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default OnGoingExam;
