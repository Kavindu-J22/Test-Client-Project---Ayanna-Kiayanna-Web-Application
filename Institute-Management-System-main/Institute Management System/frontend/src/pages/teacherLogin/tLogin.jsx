import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../teacherLogin/tLogin.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {

  let history = useHistory();
    const [email, setEmail] = useState("");
    const [firstPW, setFirstPW] = useState("");



  function sendData(e) {
    e.preventDefault();

    const logins = {
      email,
      firstPW,
    };

    axios
      .post("http://localhost:5000/teacherlog/teacherLogin", logins)

      .then(() => {
        alert("Successfully Loggedin!");
        history.push("/my-profile/"+ logins.email);
      })

      .catch((err) => {
        alert("Login Failed!");
      });
  }

    return (
      <div className="container pt-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-6 shadow round pb-3">
            <center><h2> Teacher Login Portal </h2></center><br/><br/>
        <Form onSubmit={sendData}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setFirstPW(e.target.value)}
            />
            <br></br>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
          </div>
        </div>
        </div>
    );
}
export default LoginPage;