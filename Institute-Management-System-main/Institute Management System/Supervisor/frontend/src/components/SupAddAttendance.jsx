import React, { useState } from "react";
import axios from "axios";
import "./SupAttendance.css";

export default function AddSupAttendance() {
  const [date, setDate] = useState("");
  const [classid, setClassID] = useState("");
  const [studentid, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubjectName] = useState("");

  function sendData(e) {
    // e.preventDefault();
    if (studentid===''){
      alert("Student Id cannot be empty")
    }
    else{


    const newAttendance = {
      date,
      classid,
      studentid,
      name,
      grade,
      subject,
    };
  
    axios
      .post("http://localhost:8070/supattendance/addAttendance", newAttendance)
      .then(() => {
        alert("Attendance Added Successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  }
  }
  return (
    <div>
      <div>
        <div className="page-wrapper bg-dark p-t-100 p-b-50">
          <div className="wrapper wrapper--w900">
            <div className="card card-6">
              <div className="card-heading">
                {/* <h2 className="title"></h2> */}
              </div>
              <div>
                <form onSubmit={sendData}>
                  <div className="form-row">
                    <div className="name">Date</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="date"
                        required
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Class ID</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        onChange={(e) => {
                          setClassID(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Student ID</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        maxlength="8"
                        onChange={(e) => {
                          setStudentID(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Student Name</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Grade</div>
                    <select
                      className="newUserSelect"
                      id="grade"
                      onChange={(e) => {
                        setGrade(e.target.value);
                      }}
                    >
                      <option value="grade">Select Grade</option>
                      <option value="Grade 6">Grade 6</option>

                      <option value="Grade 7">Grade 7</option>

                      <option value="Grade 8">Grade 8</option>

                      <option value="Grade 9">Grade 9</option>

                      <option value="Grade 10">Grade 10</option>

                      <option value="Grade 11">Grade 11</option>

                      <option value="Grade 12">Grade 12</option>

                      <option value="Grade 13">Grade 13</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="name">Subject Name</div>
                    <select
                      className="newUserSelect"
                      id="subject"
                      onChange={(e) => {
                        setSubjectName(e.target.value);
                      }}
                    >
                      <option value="Subject">Select Subject</option>
                      <option value="Science">Science</option>

                      <option value="Maths">Mathematics</option>

                      <option value="Sinhala">Sinhala</option>

                      <option value="English">English</option>

                      <option value="History">History</option>

                      <option value="Tamil">Tamil</option>

                      <option value="Buddhism">Buddhism</option>

                      <option value="Combined Maths">Combined Maths</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Econ">Econ</option>
                      <option value="Accounts">Accounts</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="ICT">Grade 10 ICT</option>
                      <option value="ICT">Grade 11 ICT</option>
                      <option value="ICT">AL ICT</option>
                      <option value="Sinhala">AL Sinhala</option>
                      <option value="History">AL History</option>
                      <option value="English Literature">
                        AL English Literature
                      </option>
                      <option value="Sinhala Literature">
                        AL Sinhala Literature
                      </option>
                      <option value="English Literature">
                        OL English Literature
                      </option>
                    </select>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn--radius-2 btn--blue-2"
                      type="submit"
                    >
                      Add Attendance
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
