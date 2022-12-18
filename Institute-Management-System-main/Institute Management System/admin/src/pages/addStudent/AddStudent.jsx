import React, { useState } from "react";
import "./AddStudent.css";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function AddStudent() {
  const [studentid, setStudentid] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [parentname, setParentname] = useState("");
  const [home, setHome] = useState("");
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [grade, setGrade] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      studentid,
      password,
      name,
      email,
      birthday,
      phone,
      parentname,
      home,
      address,
      school,
      male,
      female,
      grade,
    };

    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student Added Successfully!");

        setStudentid("");
        setPassword("");
        setName("");
        setEmail("");
        setBirthday("");
        setPhone("");
        setParentname("");
        setHome("");
        setAddress("");
        setSchool("");
        setGrade("");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div className="newUser">
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}; */}
      <h1 className="newUserTitle">Add Student</h1>
      <br />
      <form className="newUserForm" onSubmit={sendData}>
        <div className="newUserItem">
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Ex : G21001"
            id="studentID"
            onChange={(e) => {
              setStudentid(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Ex : Ravindu Nirmal"
            id="fullname"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Ex : Ravindu99@gmail.com"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Birthday</label>
          <input
            type="date"
            placeholder=""
            id="birthday"
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Ex : 0717070700"
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Parent Name</label>
          <input
            type="text"
            placeholder="Mr / Miss"
            id="parentname"
            onChange={(e) => {
              setParentname(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Home/Parent Contact</label>
          <input
            type="text"
            placeholder="Ex : 0717070700"
            id="home"
            onChange={(e) => {
              setHome(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="Ex : Kadawatha | Gampaha"
            id="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>School</label>
          <input
            type="text"
            placeholder="Ex : Thurstan College"
            id="school"
            onChange={(e) => {
              setSchool(e.target.value);
            }}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              id="male"
              onChange={(e) => {
                setMale(e.target.value);
              }}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              onChange={(e) => {
                setFemale(e.target.value);
              }}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Grade</label>
          <select
            className="newUserSelect"
            id="grade"
            onChange={(e) => {
              setGrade(e.target.value);
            }}
            required
          >
            <option value="Grade 06">Grade 6</option>
            <option value="Grade 07">Grade 7</option>
            <option value="Grade 08">Grade 8</option>
            <option value="Grade 09">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
            <option value="Grade 13">Grade 13</option>
          </select>
        </div>
        <input type="submit" className="submit" value="Add Student" />
      </form>
    </div>
  );
}
