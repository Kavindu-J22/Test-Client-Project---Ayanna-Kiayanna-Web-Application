import React, { useState } from "react";
import axios from "axios";
import "./AddAttendance.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import bg2 from "../../assets/images/AttBG.png";

export default function AddAttendance() {
  const [classid, setClassID] = useState("");
  const [date, setDate] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [attendance, setAttendance] = useState("");
  const [link, setLink] = useState("");

  function sendData(e) {
    // e.preventDefault();

    const newStudent = {
      classid,
      date,
      totalStudents,
      attendance,
      link,
    };

    axios
      .post("http://localhost:5000/attendance/add", newStudent)
      .then(() => {
        alert("Attendance Added Successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Header />
      <img src={bg2} alt="bgimage" className="bgimage" />

      <div style={{ marginTop: "50px" }}>
        <div className="fullCard321">
          <div className="wrapper wrapper--w900">
            <div className="card card-6">
              <div className="card-heading">
                <h2 className="titleNew">Add Attendance</h2>
              </div>
              <div>
                <form onSubmit={sendData}>
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
                    <div className="name">Total Students</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        onChange={(e) => {
                          setTotalStudents(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Attendance</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        onChange={(e) => {
                          setAttendance(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Attendance Sheet Link</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        required
                        onChange={(e) => {
                          setLink(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn--radius-2 btn--blue-2"
                      type="submit"
                    >
                      Submit
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
