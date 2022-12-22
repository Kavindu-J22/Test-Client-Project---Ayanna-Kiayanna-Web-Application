import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Header from "../../components/Header/Header";

const UserProfile = ({ location, history }) => {
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setStudentid(userInfo.studentid);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "GlobalEducation");
      data.append("cloud_name", "desnqqj6a");
      fetch("https://api.cloudinary.com/v1_1/desnqqj6a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <div>
      <Header />
      <div className="studentProfile">
        <MainScreen title="EDIT PROFILE">
          <div>
            <Row className="profileContainer">
              <Col md={6}>
                <Form onSubmit={submitHandler}>
                  {loading && <Loading />}
                  {success && (
                    <ErrorMessage variant="success">
                      Updated Successfully
                    </ErrorMessage>
                  )}
                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  <Form.Group controlId="name">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Student ID"
                      value={studentid}
                      onChange={(e) => setStudentid(e.target.value)}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>{" "}
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <br></br>
                  <Form.Group controlId="pic">
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                      onChange={(e) => postDetails(e.target.files[0])}
                      id="custom-file"
                      type="file"
                      label="Upload Profile Picture"
                      custom
                    />
                  </Form.Group>
                  <br></br>
                  <Button type="submit" varient="primary">
                    Update
                  </Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={pic} alt={name} className="profilePic" />
              </Col>
            </Row>
          </div>
        </MainScreen>
      </div>
    </div>
  );
};

export default UserProfile;
