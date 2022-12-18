import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import Logo from "../../assets/images/logo.png";
import "./Header.css";


function Header({ setSearch }) {
  const [pic, setPic] = useState();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
    setPic({ pic: "" });
  };

  return (
    <div className="header-background1">
      <div className="logo-name">
        <img src={Logo} className="logo" alt="logo" />
        <h1 className="lname1">Global Education</h1>
      </div>
      <div className="username-img">
        <div className="user-name">
          <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
            <NavDropdown.Item>
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
          </NavDropdown>
        </div>
        <img src={pic} className="userImg" />
      </div>
      <div className="nav-barMain">
        <div className="dropdown">
          <Link className="nav-item1" to="/home">
            Home
          </Link>
          <br />
        </div>

        <div className="dropdown">
          <Link className="nav-item1" to="/mynotes">
            Blog
          </Link>
          <br />
        </div>

        {/* My Classes nav */}
        <div className="dropdown">
          <span className="nav-item1">Classes</span>
          <div className="dropdown-content">
            <Link className="dropdown-text" to="/student/class">
              Attend Class
            </Link>
            <br />
            <Link className="dropdown-text" to="/student/timetable">
              TimeTable
            </Link>
            <br />
          </div>
        </div>

        {/* Examination nav */}
        <div className="dropdown">
          <Link style={{ textDecoration: "none" }} to="/student/">
            <span className="nav-item1">Exam</span>
          </Link>
          <div className="dropdown-content">
            <Link className="dropdown-text" to="/student/exams">
              View Exams
            </Link>
            <br />
            <Link className="dropdown-text" to="/student/results">
              View Results
            </Link>
            <br />
          </div>
        </div>

        {/* Request nav */}
        <div className="dropdown">
          <span className="nav-item1">Request</span>
          <div className="dropdown-content">
            <Link className="dropdown-text" to="/student/req">
              Req1
            </Link>
            <br />
          </div>
        </div>

        {/* Payment nav */}
        <div className="dropdown">
          <span className="nav-item1">Payment</span>
          <div className="dropdown-content">
            <Link className="dropdown-text" to="/student/onlinePay">
              Online Payment
            </Link>
            <br />
            <Link className="dropdown-text" to="/student/uploadSlip">
              Upload Slip
            </Link>
            <br/>
            <Link className="dropdown-text" to="/student/myPayments">
              My Payments
            </Link>

            <br />
          </div>
        </div>

        <div className="dropdown">
          <Link className="nav-item1" to="/contactUs">
            Contact Us
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Header;
