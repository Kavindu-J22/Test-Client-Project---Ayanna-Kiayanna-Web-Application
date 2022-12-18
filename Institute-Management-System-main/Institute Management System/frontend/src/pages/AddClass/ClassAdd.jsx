import React, { useState } from "react";
import axios from "axios";
import "./AddClass.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";

export default function ClassAdd() {
  const [GradeError, setGradeError] = useState("");
  const [StartTimeError, setStartTimeError] = useState("");
  const [EndTimeError, setEndTimeError] = useState("");
  const [SubjectNoError, setSubjectNoError] = useState("");
  const [SubjectNameError, setSubjectNameError] = useState("");
  const [TeacherNameError, setTeacherNameError] = useState("");
  const [LinkError, setLinkError] = useState("");
  const [ShowContent, setShowContent] = useState("");

  //get inputs
  const [Grade, setGreade] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [SubjectNo, setSubjectNo] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [TeacherName, setTeacherName] = useState("");
  const [Link, setLink] = useState("");
  const [content, setComponent] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  // validation
  function validation() {
    if (!Grade.includes("grade")) {
      setGradeError("wrong input you have to type like 'grade 11'");
      return false;
    }
    return true;
  }

  function validation2() {
    if (StartTime === "") {
      setStartTimeError("Enter field");
      return false;
    }
    return true;
  }

  function validation3() {
    if (EndTime === "") {
      setEndTimeError("Enter field");
      return false;
    }
    return true;
  }

  function validation4() {
    if (SubjectNo === "") {
      setSubjectNoError("Enter field");
      return false;
    }
    return true;
  }

  function validation5() {
    if (SubjectName === "") {
      setSubjectNameError("Enter field");
      return false;
    }
    return true;
  }

  function validation6() {
    if (TeacherName === "") {
      setTeacherNameError("Enter field");
      return false;
    }
    return true;
  }

  function validation7() {
    if (Link === "") {
      setLinkError("Enter field");
      return false;
    }
    return true;
  }

  //send photo to cloud
  const postDetails = (pics) => {
    if (!pics) {
      return setComponent("Please Select an Image");
    }
    setComponent(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "GlobalEducation");
      data.append("cloud_name", "dzjtj98dg");
      fetch("https://api.cloudinary.com/v1_1/dzjtj98dg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComponent(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setComponent("Please select an Image");
    }
  };

  function sendData(e) {
    e.preventDefault();
    const isValid = validation();
    const isValid2 = validation2();
    const isValid3 = validation3();
    const isValid4 = validation4();
    const isValid5 = validation5();
    const isValid6 = validation6();
    const isValid7 = validation7();

    if (
      isValid === true &&
      isValid2 === true &&
      isValid3 === true &&
      isValid4 === true &&
      isValid5 === true &&
      isValid6 === true &&
      isValid7 === true
    ) {
      const NewClass = {
        Grade,
        StartTime,
        EndTime,
        SubjectNo,
        SubjectName,
        TeacherName,
        Link,
        content,
      };

      axios
        .post("http://localhost:5000/AddClasses/addClass", NewClass)
        .then(() => {
          alert("Class Added");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div>
      <Header />

      <div>
        <div style={{ marginTop: "50px" }}>
          <div className="wrapper wrapper--w900">
            <div className="card-heading">
              <h2 className="title">Add Class</h2>
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
                      <div style={{ color: "red" }}>{GradeError}</div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="name">Start Time</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="time"
                        value={StartTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      />
                      <div style={{ color: "red" }}>{StartTimeError}</div>
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
                      <div style={{ color: "red" }}>{EndTimeError}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Subject Number</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        onChange={(e) => {
                          setSubjectNo(e.target.value);
                        }}
                      />
                      <div style={{ color: "red" }}>{SubjectNoError}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Subject Name</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={SubjectName}
                        onChange={(e) => {
                          setSubjectName(e.target.value);
                        }}
                      />
                      <div style={{ color: "red" }}>{SubjectNameError}</div>
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
                      <div style={{ color: "red" }}>{TeacherNameError}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Link</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="link"
                        onChange={(e) => {
                          setLink(e.target.value);
                        }}
                      />
                      <div style={{ color: "red" }}>{LinkError}</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Component</div>
                    <div className="value">
                      <div className="input-group js-input-file">
                        <input
                          className="input-file"
                          type="file"
                          name="file_cv"
                          id="file"
                          onChange={(e) => {
                            postDetails(e.target.files[0]);
                          }}
                        />
                        <label className="label--file" htmlFor="file">
                          Choose file
                        </label>
                      </div>
                      <div style={{ color: "blue" }}>{content}</div>
                      <div className="label--desc">
                        Upload lesson contents jpg or any png image files. Max
                        file size 50 MB
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">


                    <button className="btn btn--radius-2 btn--blue-2" type="submit"/>

                    <button
                      className="btn btn--radius-2 btn--blue-2"
                      type="submit"
                    />


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
