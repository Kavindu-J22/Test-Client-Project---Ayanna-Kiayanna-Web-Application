import React from "react";
import "./tHeader.css";
import Logo from "../../../assets/images/logo.png";
import UserImg from "../../../assets/images/teacher.jpg";
import { Link } from "react-router-dom";

function tHeader() {
  return (
    <div className="header-background">
      <div className="logo-name">
        <img src={Logo} className="logo" alt="logo" />
        <h1 className="lname">Global Education</h1>
      </div>
      <div className="username-img">
        <div className="user-name">
          <p>Mrs. Gayani Perera</p>
        </div>
        <Link to="/teacher/:profileId">
          <img src={UserImg} className="userImg" alt="user img" />
        </Link>
      </div>

      <div className="nav-bar">
        {/* Home nav */}
        <div className="dropdown">
          <Link className="nav-item" to="/">
            Home
          </Link>{" "}
          <br />
        </div>

        {/* My Classes nav */}
        <div className="dropdown">
          <span className="nav-item">MyClasses</span>

          <div className="dropdown-content">
            <Link className="dropdown-text" to="/teacher/addClass">
              Add Class
            </Link>{" "}
            <br />
            <Link className="dropdown-text" to="/teacher/rejectClass">
              Reject Class
            </Link>{" "}
            <br />
          </div>
        </div>

        {/* Examination nav */}
        <div className="dropdown">
          <span className="nav-item">Exam</span>

          <div className="dropdown-content">
            <Link className="dropdown-text" to="/teacher/exam">
              Exam List
            </Link>{" "}
            <br />
            <Link className="dropdown-text" to="/teacher/ans">
              Answers
            </Link>{" "}
            <br />
            <Link className="dropdown-text" to="/teacher/res">
              Results
            </Link>{" "}
            <br />
            <Link className="dropdown-text" to="/teacher/rep">
              Report
            </Link>
          </div>
        </div>

        {/* Request nav */}
        <div className="dropdown">
          <span className="nav-item">Request</span>

          <div className="dropdown-content">
            <Link className="dropdown-text" to="/teacher/rating">
              My Rating
            </Link>{" "}
            <br />
            <Link className="dropdown-text" to="/teacher/res">
              Support
            </Link>{" "}
            <br />
          </div>
        </div>

        {/* Attendence nav */}
        <div className="dropdown">
          <span className="nav-item">Attendence</span>

          <div className="dropdown-content">
            <Link className="dropdown-text" to="/teacher/addAttendance">
              Add Attendence{" "}
            </Link>
            <br />
            <Link className="dropdown-text" to="/teacher/getAttendance">
              View Attendence{" "}
            </Link>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default tHeader;
