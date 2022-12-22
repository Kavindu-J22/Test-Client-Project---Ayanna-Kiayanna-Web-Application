import React from "react";
import Header from "../../components/Header/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import "./submitAnswer.css";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function SubmitAnswer(props) {
  const { _id } = useParams();

  //get exam details
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
        .get(`http://localhost:5000/exam/getExams/${_id}`)
        .then((res) => {
          //console.log(res);
          setExam(res.data);
        })
        .catch((err) => {
          alert(err.message);
        }, []);
    }

    getExams();
  }, []);
  //******************************

  //get start time
  var startTime = exams[0].start;
  var splitStart = startTime.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var startSec = +splitStart[0] * 60 * 60 + +splitStart[1] * 60;

  //get end time
  var EndTime = exams[0].end;
  var splitend = EndTime.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var endSec = +splitend[0] * 60 * 60 + +splitend[1] * 60;

  //get time deference
  var timedef = endSec - startSec;
  //convert in to format
  var hours = Math.floor(timedef / 60 / 60);
  var minutes = Math.floor((timedef - hours * 60 * 60) / 60);

  //console.log(minutes);

  const [content, setComponent] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  //send photo to cloud
  const postDetails = (pics) => {
    if (!pics) {
      return setComponent("Please Select an Image");
    }
    setComponent(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "GlobalEducation");
      data.append("cloud_name", "desnqqj6a");
      fetch("https://api.cloudinary.com/v1_1/desnqqj6a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComponent(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setComponent("Please select an Image");
    }
  };
  const ename = exams[0].examname;
  function sendData(e) {
    // e.preventDefault();

    const newAnswer = new FormData();

    newAnswer.append("content", content);
    newAnswer.append("examname", ename);

    axios
      .post("http://localhost:5000/answer/addAnswer", newAnswer)
      .then((res) => {
        alert("Answer Submited!");
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
    console.log(newAnswer);
  }

  const classes = useStyles();
  return (
    <div>
      <Header />

      <div>
        <h2 style={{ marginTop: "50px", marginLeft: "150px" }}>
          {exams[0].examname}
        </h2>
        <h5 style={{ marginLeft: "150px", color: "GrayText" }}>
          Maximum Time : {hours + "h" + " . " + minutes + "min"}
        </h5>
        <h5
          style={{ float: "right", marginRight: "165px", marginTop: "-75px" }}
        >
          Time Left
        </h5>

        <div className={classes.root}>
          <a
            href={exams[0].content}
            style={{ textDecoration: "none", float: "left" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "150px", marginTop: "35px" }}
            >
              Download Paper
            </Button>
          </a>
        </div>
        <form onSubmit={sendData}>
          <div className="form-group files">
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
          </div>
          <button
            style={{
              float: "right",
              marginRight: "155px",
              marginTop: "20px",
              backgroundColor: "#FFAF0F",
              width: "150px",
              height: "40px",
              color: "white",
              fontSize: "20px",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitAnswer;
