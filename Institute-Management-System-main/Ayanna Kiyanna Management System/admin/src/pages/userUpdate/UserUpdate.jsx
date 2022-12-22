import React, { useEffect, useState } from "react";
import "./UserUpdate.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function UserUpdate() {
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [pic, setPic] = useState("");

  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    // useEffect(()=>{

    let mounted = true;

    fetch(`http://localhost:8070/student/getOneStudent/${_id}`)
      .then((res) => res.json())

      .then((result) => {
        if (mounted) {
          setStudentid(result.studentid);

          setName(result.name);

          setEmail(result.email);

          setPhone(result.phone);

          setAddress(result.address);

          setSchool(result.school);

          setGrade(result.grade);

          setPic(result.pic);

          //   setCfname(result.fname)
        }
      });

    return () => (mounted = false);
  }

  const submitHandler = (event) => {
    //event.preventDefault();
    const data = {
      studentid,
      name,
      email,
      phone,
      address,
      school,
      grade,
    };

    axios
      .put(`http://localhost:8070/student/studentUpdate/${_id}`, data)
      .then((res) => {
        alert("Student Details Updated Successfully!");
        console.log(data);
      })
      .catch((err) => {
        alert("Database Error");
      });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Update Student Details</h1>

        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <br />
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={pic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{studentid}</span>
              <span className="userShowUserTitle">Student ID</span>
            </div>
          </div>
          <br />
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{grade}</span>
            </div>
            <br />
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <br />
            <span className="userShowTitle">Personal Address</span>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{address}</span>
            </div>
            <br />
            <span className="userShowTitle">School</span>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{school}</span>
            </div>
          </div>
        </div>

        {/* ********************************* * User Update ************************************************ */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Update Details Here</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Student ID</label>
                <input
                  type="text"
                  placeholder="Ex : G210011"
                  className="userUpdateInput"
                  value={studentid}
                  onChange={(e) => setStudentid(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Ex : 0717073719"
                  className="userUpdateInput"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Ex : Colombo | Sri Lanka"
                  className="userUpdateInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>Grade</label>
                <input
                  type="text"
                  placeholder="Ex : Grade 8, 9, 10"
                  className="userUpdateInput"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <br />
              <div className="userUpdateItem">
                <label>School</label>
                <input
                  type="text"
                  placeholder="Ex : Thurstan College"
                  className="userUpdateInput"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div className="userUpdateRight">
                <button
                  className="userUpdateButton"
                  onClick={() => submitHandler()}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
