import { useReactToPrint } from "react-to-print";
import "./Teacher.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileCopyIcon from "@material-ui/icons/FileCopy";

export default function ShowTeacher() {


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    
    const [details, setDetails] = useState([]);

    useEffect(() => {
      function getTeachers() {
        axios
          .get("http://localhost:8070/teacher/")
          .then((res) => {
            setDetails(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getTeachers();
    }, []);

    const renderData = (data, index) => {
      return (
        <tr key={index}>
          <td>{data.regNo}</td>
          <td>
            {data.fName} {data.lName}
          </td>
          <td>{data.classId}</td>
          <td>{data.mobileNo}</td>
          <td>{data.email}</td>
        </tr>
      );
    };


    return (
      <div className="flecContainer">
        <div className="btnContainer">
          <div className="reportBtn">
            <button className="reportBtn-Btn" onClick={handlePrint}>
              <FileCopyIcon />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div >
          <div >
            <div >
              <div >
                <div ref={componentRef}>

                  <h2 >Teachers' Details</h2>

                  <table className="tableStyle" id="content">
                    <thead className="tHead">
                      <tr>
                        <th>Registration No.</th>
                        <th>Teacher Name</th>
                        <th>Class ID</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody className="tableRaw">
                      {details.map(renderData)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
