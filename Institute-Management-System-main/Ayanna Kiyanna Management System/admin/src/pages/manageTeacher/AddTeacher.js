import React, { useState } from 'react';
import axios from "axios";
import './Teacher.css'
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";

  

  //material UI style
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '35ch',
      },
    },
  }));

  //Title drop downlist
  const cTitle = [
    {
      value: "Mr",
      label: "Mr.",
    },
    {
      value: "Ms",
      label: "Ms.",
    },
  ];

  //gender drop downlist
  const cGender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];


  function AddTeacher() {
  
    let history = useHistory();
    const classes = useStyles();

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
    const [reFirstPW, setReFirstPW] = useState("");
    
    function sendData(e){
        e.preventDefault();

        //check the both password1 and password2 are same or not
        if (firstPW === reFirstPW){
            //create object to assign values
            const newTeacher = {
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
              reFirstPW,
            };

            axios.post("http://localhost:8070/teacher/add", newTeacher).then(()=>{
              alert("Teacher Added successfully!")
              history.push("/teacher/list");

            }).catch ((err)=>{
                alert("Coud not save!", err)
            })
        }
        //if passwords are mismatched
        else {
            alert ("Password Mismatch!")
        }
    }

    function backNavigate() {
      history.push("/teacher/list");
    }

    return (
      <div className="flecContainer">
        <div className="mainTitle">Add New Teacher</div>
        <div className="subTitle1">
          --------------- Personal Details ---------------
        </div>

        <form className={classes.root} onSubmit={sendData} autoComplete="off">
          <div>
            <TextField
              //required
              label="First Name"
              placeholder="Enter First Name"
              id="fName"
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
            <TextField
              ////required
              label="Last Name"
              id="lName"
              placeholder="Enter Last Name"
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
            <TextField
              select
              //required
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            >
              {cTitle.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              select
              //required
              label="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              {cGender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              //required
              label="NIC"
              id="nic"
              placeholder="Enter NIC"
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
            <TextField
              //required
              label="Mobile No."
              id="mNumber"
              placeholder="07XXXXXXXX"
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
            />
            <br />
            <TextField
              //required
              label="Email"
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <div className="subTitle2">
              --------------- Admin ---------------
            </div>
            <TextField
              //required
              label="Registration No."
              id="regNo"
              placeholder="Assign Registration No."
              onChange={(e) => {
                setRegNo(e.target.value);
              }}
            />

            <TextField
              //required
              label="Class ID"
              id="classId"
              placeholder="Assign class ID"
              onChange={(e) => {
                setClassId(e.target.value);
              }}
            />
            <br />
            <TextField
              //required
              label="Username"
              id="firstUN"
              placeholder="Assign New Username"
              onChange={(e) => {
                setFirstUN(e.target.value);
              }}
            />
            <TextField
              //required
              label="Password"
              type="password"
              id="firstPW"
              placeholder="Assign New Password"
              onChange={(e) => {
                setFirstPW(e.target.value);
              }}
            />
            <TextField
              //required
              label="Re-Enter Password"
              id="reFirstPW"
              type="password"
              placeholder="Re-Enter Password"
              ////required
              onChange={(e) => {
                setReFirstPW(e.target.value);
              }}
            />

            <button
              type="button"
              className="cancelButton"
              onClick={backNavigate}
            >
              {" "}
              Cancel
            </button>

            <button type="submit" className="submitButton">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
}

export default AddTeacher;
