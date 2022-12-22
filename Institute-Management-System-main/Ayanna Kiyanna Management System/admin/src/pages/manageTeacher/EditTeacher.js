import React, { useEffect, useState } from "react";
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


export default function EditTeacher(props) {

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

    //console.log(res.data);
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

    //console.log(title)
  };

  //update data button
  const updateData = (event) => {
    event.preventDefault();
    const data = {
      fName,
      lName,
      title,
      gender,
      nic,
      mobileNo,
      email,
      regNo,
      classId,
      firstUN,
      firstPW,
    }

    axios
      .put(`http://localhost:8070/teacher/update/${id}`, data)
      .then((res) => {
        // console.log(data);
        alert("Employee Updated Successfully");
        history.push("/teacher/list");
        console.log(data);
      })
      .catch((err) => {
        alert("Error in update!");
      });
  };

  function backNavigate() {
    history.push("/teacher/list");
  }

  return (
    <div className="flecContainer">
      <div className="mainTitle">Edit Details</div>
      <div className="subTitle1">
        --------------- Personal Details ---------------
      </div>

      <form className={classes.root} onSubmit={updateData}>
        <div>
          <TextField
            required
            label="First Name"
            id="fName"
            value={fName}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />

          <TextField
            required
            label="Last Name"
            id="lName"
            value={lName}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />

          <TextField disabled label="Title" value={title}></TextField>

          <br />
          <TextField disabled label="Gender" value={gender}></TextField>

          <TextField
            label="NIC"
            id="nic"
            value={nic}
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />

          <TextField
            label="Mobile No."
            id="mNumber"
            value={mobileNo}
            onChange={(e) => {
              setMobileNo(e.target.value);
            }}
          />
          <br />
          <TextField
            disabled
            label="Email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className="subTitle2">--------------- Admin ---------------</div>

          <TextField
            label="Registration No."
            id="regNo"
            value={regNo}
            onChange={(e) => {
              setRegNo(e.target.value);
            }}
          />

          <TextField
            label="Class ID"
            id="classId"
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
            }}
          />
          <br />
          <TextField value={firstUN} id="firstUN" disabled />

          <TextField value={firstPW} type="password" id="firstPW" disabled />
          <br />

          <button type="button" className="cancelButton" onClick={backNavigate}>
            {" "}
            Cancel
          </button>
          <input type="submit" className="updateButton" value="Update"></input>
        </div>
      </form>
    </div>
  );
}
