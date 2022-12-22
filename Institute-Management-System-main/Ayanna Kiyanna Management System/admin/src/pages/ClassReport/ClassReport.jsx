import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import "./ClassReportcss.css";

export default function ClassReport() {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  const [searchGrade, setsearchGrade] = useState("");
  const [searchSubject, setsearchSubject] = useState("");
  const [searchTeacher, setsearchTeacher] = useState("");
  //get data from getdata

  // get results from database

  const [classes, setclasses] = useState([
    {
      Grade: "",
      StartTime: "",
      EndTime: "",
      SubjectNo: "",
      SubjectName: "",
      TeacherName: "",
      Link: "",
      content: "",
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:8070/StudentClasses/getStudentClass")
        .then((res) => {
          console.log(res);
          setclasses(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getclasses();
  }, []);
  //******************************

  const renderClass = (classes, index) => {
    return (
      <tr key={index}>
        <td>{classes.Grade}</td>
        <td>{classes.StartTime}</td>
        <td>{classes.EndTime}</td>
        <td>{classes.SubjectNo}</td>
        <td>{classes.SubjectName}</td>
        <td>{classes.TeacherName}</td>
        <td>{classes.Link}</td>
      </tr>
    );
  };

  return (
    <div className="newUser">
      <div className="card-heading">
        <h2 className="title">Attend to the Class</h2>
      </div>
      <div>
        <button
          color="primary"
          variant="contained"
          className="buttonContent buttonContent2"
          onClick={handlePrint}
        >
          Download PDF
        </button>
      </div>
      <div>
        <input
          placeholder="search grade"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchGrade(event.target.value)}
        />
        <input
          placeholder="search Subject"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchSubject(event.target.value)}
        />
        <input
          placeholder="search Teacher"
          className="Ddown"
          type="text"
          onChange={(event) => setsearchTeacher(event.target.value)}
        />

        <div ref={componentRef} className="table-wrapper">
          <table className="fl-table98">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Class ID</th>
                <th>Subject Name</th>
                <th>Theacher Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {classes
                .filter((val) => {
                  if (searchGrade === "") return val;
                  else if (
                    (val.Grade.toLowerCase().includes(
                      searchGrade.toLowerCase()
                    ),
                    val.SubjectName.toLowerCase().includes(
                      searchSubject.toLowerCase()
                    ),
                    val.TeacherName.toLowerCase().includes(
                      searchTeacher.toLowerCase()
                    ))
                  ) {
                    return val;
                  }
                })
                .map(renderClass)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
