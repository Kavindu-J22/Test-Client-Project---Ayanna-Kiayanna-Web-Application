import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useHistory } from "react-router-dom";
import "./EditAttendance.css";
import bg2 from "../assets/images/editbgimg.png";

export default function SupEditAttendance() {
  const [date, setDate] = useState("");
  const [classid, setClassid] = useState("");
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const { _id } = useParams();

  console.log(_id);
  let history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    // useEffect(()=>{

    let mounted = true;

    fetch(`http://localhost:8070/supattendance/oneStudent/${_id}`)
      .then((res) => res.json())

      .then((result) => {
        if (mounted) {
          setDate(result.date);

          setClassid(result.classid);

          setStudentid(result.studentid);

          setName(result.name);

          setGrade(result.grade);

          setSubject(result.subject);
        }
      });

    return () => (mounted = false);
  }

  const submitHandler = (event) => {
    //event.preventDefault();

    const data = {
      date,
      classid,
      studentid,
      name,
      grade,
      subject,
    };

    axios

      .put(`http://localhost:8070/supattendance/update/${_id}`, data)

      .then((res) => {
        alert("Attendance Updated Successfully!");
        history.push("/add");

        console.log(data);
      })

      .catch((err) => {
        alert("Database Error");
      });
  };

  return (
    <div className="user">
      <div className="userUpdate">
        <span className="userUpdateTitle">Edit Attendance</span>
        <form className="userUpdateForm">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label className="userUpdateTopics"> Date </label>
              <input
                type="text"
                placeholder="Ex : 2021-09-07"
                className="userUpdateInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <label className="userUpdateTopics"> Class ID </label>
              <input
                type="text"
                placeholder="Ex : CM1G12"
                className="userUpdateInput"
                value={classid}
                onChange={(e) => setClassid(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <label className="userUpdateTopics">Student ID </label>
              <input
                type="text"
                placeholder="Ex : G2100078"
                className="userUpdateInput"
                value={studentid}
                onChange={(e) => setStudentid(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <label className="userUpdateTopics">Name</label>
              <input
                type="text"
                placeholder="Ex : Hasith Deminda"
                className="userUpdateInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <label className="userUpdateTopics"> Grade </label>
              <input
                type="text"
                placeholder="Ex : Grade 12"
                className="userUpdateInput"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <label className="userUpdateTopics"> Subject </label>
              <input
                type="text"
                placeholder="Ex : Combined Maths"
                className="userUpdateInput"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <br />
            <div className="userUpdateItem">
              <button
                className="userUpdateButton"
                onClick={() => submitHandler()}
              >
                Update
              </button>
            </div>
            <img src={bg2} alt="bgimg" className="bgimage" />
          </div>
        </form>
      </div>
    </div>
  );
}
