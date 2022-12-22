import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teacher.css";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

//material UI style
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "35ch",
    },
  },
}));



export default function DeleteTeacher(props) {

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [classId, setClassId] = useState("");
  const [firstUN, setFirstUN] = useState("");
  const [firstPW, setFirstPW] = useState("");

  useEffect(() => {
    getTeacherDetails();
  }, []);

  const classes = useStyles();
  let history = useHistory();
  const id = props.match.params.id;

  const getTeacherDetails = async () => {
    const res = await axios.get(`http://localhost:8070/teacher/find/${id}`);

    console.log(res.data);
    setFname(res.data.teacher.fName);

    setLname(res.data.teacher.lName);
    setTitle(res.data.teacher.title);
    setGender(res.data.teacher.gender);
    setNic(res.data.teacher.nic);
    setMobileNo(res.data.teacher.mobileNo);
    setEmail(res.data.teacher.email);
    setRegNo(res.data.teacher.regNo);
    setClassId(res.data.teacher.classId);
    setFirstUN(res.data.teacher.firstUN);
    setFirstPW(res.data.teacher.firstPW);

    console.log(fName)
  };

  function onDelete(ID) {
    axios
        .delete(`http://localhost:8070/teacher/delete/${ID}`)
        .then((res) => {
          console.log(res);
          alert("Teacher Deleted!!!");
          history.push("/teacher/list");
        })
        .catch((err) => {
          alert(err.message);
        });
    
  }

  function backNavigate() {
    history.push("/teacher/list");
  }

  return (
    <div className="flecContainer">
      <div className="mainTitle">Delete Teacher</div>
      <div className="subTitle1">
        --------------- Personal Details ---------------
      </div>

      <form className={classes.root}>
        <div>
          <TextField required label="First Name" disabled value={fName} />

          <TextField required label="Last Name" disabled value={lName} />

          <TextField disabled label="Title" value={title}></TextField>

          <br />
          <TextField disabled label="Gender" value={gender}></TextField>

          <TextField label="NIC" disabled value={nic} />

          <TextField label="Mobile No." disabled value={mobileNo} />
          <br />
          <TextField label="Email" disabled value={email} />

          <div className="subTitle2">--------------- Admin ---------------</div>

          <TextField label="Registration No." disabled value={regNo} />

          <TextField label="Class ID" disabled value={classId} />
          <br />
          <TextField value={firstUN} disabled />

          <TextField value={firstPW} type="password" disabled />
          <br />

          <button type="button" className="cancelButton" onClick={backNavigate}>
            {" "}
            Cancel
          </button>
          <button
            type="button"
            className="deleteButton"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}