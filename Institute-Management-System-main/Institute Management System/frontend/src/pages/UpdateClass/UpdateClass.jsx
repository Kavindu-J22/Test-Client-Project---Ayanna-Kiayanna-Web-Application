import React, { useState, useEffect } from "react";
import axios from "axios";
import "./updateclasscss.css";
import Header from "../../components/Headers/TeacherHeader/tHeader";

export default function UpdateClass(props) {
  const id = props.match.params.Subjectid;
  console.log(id);

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

  // get data
  useEffect(() => {
    getResults();
  }, []);

  function getResults() {
    let mounted = true;
    fetch(`http://localhost:5000/RejectClasses/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setGreade(result[0].Grade);
          setStartTime(result[0].StartTime);
          setEndTime(result[0].EndTime);
          setSubjectNo(result[0].SubjectNo);
          setSubjectName(result[0].SubjectName);
          setTeacherName(result[0].TeacherName);
          setLink(result[0].Link);
          setComponent(result[0].content);

          // console.log(result);
        }
      });
    return () => (mounted = false);
  }

  function sendData(e) {
    // e.preventDefault();

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
      .post("http://localhost:5000/AddClasses/addClass/", NewClass)
      .then(() => {
        alert("Class Added");
      })
      .catch((err) => {
        alert(err);
      });
    
    axios
      .put(`http://localhost:5000/RejectClasses/update/${SubjectNo}`, NewClass)
      .then(() => {
        alert("Class Updated");
      })
      .catch((err) => {
        alert(err);
      });
    
  }

  return (
    <div>
      <Header />

      <div>
        <div style={{ marginTop: "50px" }}>
          <div className="wrapper wrapper--w900">
            <div className="card-heading">
              <h2 className="title">Update Class</h2>
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
                        value={Grade}
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
                        value={StartTime}
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
                        value={EndTime}
                        onChange={(e) => {
                          setEndTime(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Subject Number</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="text"
                        value={SubjectNo}
                        onChange={(e) => {
                          setSubjectNo(e.target.value);
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
                        value={SubjectName}
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
                        value={TeacherName}
                        onChange={(e) => {
                          setTeacherName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Link</div>
                    <div className="value">
                      <input
                        className="input--style-6"
                        type="link"
                        value={Link}
                        onChange={(e) => {
                          setLink(e.target.value);
                        }}
                      />
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
                        Upload lesson pdf or any other relevant file. Max file
                        size 50 MB
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn--radius-2 btn--blue-2"
                      type="submit"
                    >
                      Update
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
