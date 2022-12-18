import React, { useRef } from 'react';
import { useEffect,useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '@material-ui/core/Button';
import './staffreport.css';
import axios from 'axios';

export default function Staffreport({search,setSearch}){
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [staffde, setstaffde] = useState([
    {
      fname: "",
      email: "",
      nic: "",
      position: "",
      type: "",
      allowance: "",
      basicsalary: "",
      date: "",
    },
  ]);

  useEffect(() => {
    function getdetails() {
      axios
        .get("http://localhost:8070/staffpaysalary/view/")
        .then((res) => {
          console.log(res);
          setstaffde(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getdetails();
  },[]);

  const renderClass = (staffde, index) => {
    return (
      <tr key={index}>
        <td className="table-clo1">{staffde.fname}</td>
        {/* <td>{staffde.email}</td> */}
        <td className="table-clo2">{staffde.nic}</td>
        <td className="table-clo3">{staffde.type}</td>
        <td className="table-clo4">{staffde.position}</td>
        <td className="table-clo5">Rs.{staffde.allowance}</td>
        <td className="table-clo6">Rs.{staffde.basicsalary}</td>
        <td className="table-clo7">{staffde.date}</td>
      </tr>
    );
  };

  return (
      <div className="newstaff">
        <div className="marginaling">
        <Button color="primary" variant="contained" className="btn1234" onClick={handlePrint}>Download PDF</Button>
        </div>
    <div className="scroll-bgn">
      <div className="scroll-divn">
      <div className="scroll-objectn">
      <div className="wrapper-flex ">
        
      <input placeholder="Enter the NIC Number" className="searchbox" type="search" onChange={(e) => setSearch(e.target.value)}/>
      <div ref={componentRef}>
        <h2 className="aling topic-report">Monthly Emplooye Salary Report</h2>
        
        <table className="table-report">
            <thead>
              <tr>
                <th>Empoolye Name</th>
                {/* <th>Empoolye E-mail</th> */}
                <th>Empoolye NIC</th>
                <th>Empoolye Type</th>
                <th>Empoolye Position</th>
                <th>Empoolye Allowance</th>
                <th>Empoolye Basicsalary</th>
                <th>Empoolye Payment Date</th>
              </tr>
            </thead>
            <tbody>{staffde ?.reverse()
                .filter((filteredStudents) =>
                  filteredStudents.nic
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ).map(renderClass)}</tbody>
          </table>
        </div>
        </div>
        </div>
        </div>
    </div>
    </div>
  );
};