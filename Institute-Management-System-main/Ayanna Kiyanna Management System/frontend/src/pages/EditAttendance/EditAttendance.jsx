import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./EditAttendance.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";
import bg2 from "../../assets/images/AttBG.png";

export default function EditAttendance() {
  const [classid, setClassid] = useState("");
  const [date, setDate] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [attendance, setAttendance] = useState("");
  const [link, setLink] = useState("");

  const { _id } = useParams();

  console.log(_id);
  let history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    // useEffect(()=>{

    let mounted = true;

    fetch(`http://localhost:5000/attendance/oneClass/${_id}`)
      .then((res) => res.json())

      .then((result) => {
        if (mounted) {
          setClassid(result.classid);

          setDate(result.date);

          setTotalStudents(result.totalStudents);

          setAttendance(result.attendance);

          setLink(result.link);
        }
      });

    return () => (mounted = false);
  }

  const submitHandler = (event) => {
    //event.preventDefault();

    const data = {
      classid,
      date,
      totalStudents,
      attendance,
      link,
    };

    axios

      .put(`http://localhost:5000/attendance/update/${_id}`, data)

      .then((res) => {
        alert("Attendance Details Updated Successfully!");
        history.push(`/teacher/getAttendance`);
        event.preventDefault();

        console.log(data);
      })

      .catch((err) => {
        alert("Database Error");
      });
  };

  return (
    <div>
      <Header />
      <img src={bg2} alt="bgimage" className="bgimage" />
      <div style={{ marginTop: "50px" }}>
        <div className="fullCard">
          <div className="wrapper wrapper--w900">
            <div className="card card-6">
              <div className="card-heading">
                <h2 className="titleNew">Edit</h2>
              </div>
              <div>
                <form onSubmit={submitHandler}>
                  <div className="form-row">
                    <div className="name">Class ID</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={classid}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Date</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Total Students</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={totalStudents}
                        onChange={(e) => setTotalStudents(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Attendance</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Attendance Sheet Link</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn--radius-2 btn--blue-2"
                      type="submit"
                      // onClick={() => submitHandler()}
                    >
                      Update
                    </button>
                  </div>
                </form>
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
