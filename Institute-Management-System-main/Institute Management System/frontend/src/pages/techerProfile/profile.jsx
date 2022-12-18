import "./profile.css"
import THeader from "../../components/Headers/TeacherHeader/tHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import UserImg from '../../assets/images/no-user-image.png';


export default function Profile(props) {

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [classId, setClassId] = useState("");
  const [firstUN, setFirstUN] = useState("");
  const [firstPW, setFirstPW] = useState("");

  useEffect(() => {
    getTeacherDetails1();
  }, []);
  
  let history = useHistory();
  const id = props.match.params.email;

  const getTeacherDetails1 = async () => {
    const res = await axios.get(
      `http://localhost:5000/teacherlog/find/${id}`
    );

    //console.log(res.data);
    setFname(res.data.teacher.fName);
    setLname(res.data.teacher.lName);
    setTitle(res.data.teacher.title);
    setGender(res.data.teacher.gender);
    setNic(res.data.teacher.nic);
    setMobileNo(res.data.teacher.mobileNo);
    setEmail(res.data.teacher.email);
    setRegNo(res.data.teacher.regNo);
    setClassId(res.data.teacher.classId);
    setFirstUN(res.data.teacher.firstUN);
    setFirstPW(res.data.teacher.firstPW);

    // console.log(fName)
  };

  const updateData = (event) => {
    event.preventDefault();
    const data = {
      fName,
      lName,
      title,
      gender,
      nic,
      mobileNo,
      email,
      regNo,
      classId,
      firstUN,
      firstPW,
    };

    axios
      .put(`http://localhost:5000/teacherlog/updateTeacher/${id}`, data)
      .then((res) => {
        console.log(data);
        alert("Profile Updated Successfully");
        history.push("/my-profile/"+data.email);
        console.log(data);
      })
      .catch((err) => {
        alert("Error in update!");
      });
  };

    return (
      <div className="profile">
        <THeader />
        <div className="profileContainer">
          <div className="profileShow">
            <div className="profileShowTop">
              <img src={UserImg} alt="" className="userShowImg" />

              <div className="profileShowTopTitle">
                <span className="profileShowUsername">
                  {fName} {lName}
                </span>
              </div>
            </div>

            <div className="profileShowBottom">
              <span className="profileShowTitle">Account Details</span>
              <div className="profileShowInfo">
                <span className="profileShowInfoTitle">Registration No: </span>
                <span className="profileShowInfoInfo">{regNo} </span>
              </div>
              <div className="profileShowInfo">
                <span className="profileShowInfoTitle">Username: </span>
                <span className="profileShowInfoInfo">{firstUN} </span>
              </div>
              <span className="profileShowTitle">Contact Details</span>
              <div className="profileShowInfo">
                <img
                  className="profileShowInfoIcon"
                  alt=""
                  src="https://img.icons8.com/material-outlined/24/000000/iphone--v2.png"
                />
                <span className="profileShowInfoTitle">{mobileNo}</span>
              </div>
              <div className="profileShowInfo">
                <img
                  className="profileShowInfoIcon"
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-email-business-kiranshastry-lineal-kiranshastry.png"
                  alt=""
                />
                <span className="profileShowInfoTitle">{email}</span>
              </div>
            </div>
          </div>

          <div className="profileUpdate">
            <span className="userUpdateTitle">Edit Details</span>
            <form className="userUpdateForm" onSubmit={updateData}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    value={fName}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <TextField
                    type="text"
                    value={lName}
                    className="userUpdateInput"
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    className="userUpdateInput"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={mobileNo}
                    className="userUpdateInput"
                    onChange={(e) => {
                      setMobileNo(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={UserImg} alt="" />
                </div>
                <button className="userUpdatephoto">Change Photo</button>
                <button type="submit" className="userUpdateButton">
                  Update Profile
                </button>
                {/*<button className="userUpdateButton">Change Password</button>*/}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}