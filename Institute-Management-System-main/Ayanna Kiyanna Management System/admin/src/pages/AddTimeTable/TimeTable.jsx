import React, { useState } from "react";
import axios from "axios";
import "./TimeTablecss.css";
// import Header from "../../components/Headers/TeacherHeader/tHeader";

export default function AddTimeTable() {
  //get inputs

  const [Grade, setGreade] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [Date, setDate] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [TeacherName, setTeacherName] = useState("");


  //send data to mongo

  function sendData(e) {
    // e.preventDefault();

    const NewClass = {
      Grade,
      StartTime,
      EndTime,
      Date,
      SubjectName,
      TeacherName
    }

    axios
      .post("http://localhost:8070/TimeTable/addTimeTable", NewClass)
      .then(() => {
        alert("TimeTable row Added");
        console.log(NewClass);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="newUser">
      {/* <Header /> */}

      <div>
        <div style={{ marginTop: "50px" }}>
          <div className="wrapper wrapper--w900">
            <div className="card-heading">
              <h2 className="title">Add Class To TimeTable</h2>
            </div>

            <div className="card card-6">
              <div>
                <form onSubmit={sendData} encType="multipart/from-data">
                  <div className="form-row">
                    <div className="name">Grade</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        onChange={(e) => {
                          setGreade(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="name">Start Time</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="time"
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">End Time</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="time"
                        onChange={(e) => {
                          setEndTime(e.target.value);
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
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Subject Name</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        onChange={(e) => {
                          setSubjectName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Teacher Name</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        onChange={(e) => {
                          setTeacherName(e.target.value);
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
