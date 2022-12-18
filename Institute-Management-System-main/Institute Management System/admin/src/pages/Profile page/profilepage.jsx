import React from 'react';
import { useEffect,useState } from 'react';
import "./profliepage.css"
import Button from '@material-ui/core/Button';
import {useParams } from 'react-router';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

export default function Proflipage(){
  
  const [worker,setworker]=useState({});
  const {nic}=useParams()
  let history = useHistory();

  function drop(){
   axios.delete(`http://localhost:8070/staff/proflie/delete/${nic}`)
   .then(res=>{
     alert("Deleted!")
     history.push("/viewstaff")
   })
   .catch(
     
   );
  }
  
 
  useEffect(()=>{
  let mounted = true;
    fetch(`http://localhost:8070/staff/profile/${nic}`)
    .then(res=> res.json())
    .then((result)=>{
      if(mounted){
      setworker(result);
      }
    })
    return () => mounted = false;
})
  

  return(
    <div className="newstaff">
    <h1 className='topic'>Employee Profile</h1>
    <div className="allbtn">
    <Link to={`/allowance/${nic}`}>
        <Button variant="contained" color="primary">Add Allowance</Button>
      </Link>
      </div>
      <div className="paybtn">
      <Link to={`/paysalary/${nic}`}>
        <Button variant="contained" color="primary">Pay Salary</Button> 
      </Link>
      </div>
    <table className="tabled">
      <thead>
        <tr>
          <th className="thd trn">Name</th>
          <th className="thd trn">{worker.fname}{worker.sname}</th>
        </tr>
        <tr>
          <th className="thd">NIC</th>
          <th className="thd">{worker.nic}</th>
        </tr>
        <tr>
          <th className="thd trn">E-mail</th>
          <th className="thd trn">{worker.email}</th>
        </tr>
        <tr>
          <th className="thd">Position</th>
          <th className="thd">{worker.position}</th>
        </tr>
        <tr>
          <th className="thd trn">Phone Number</th>
          <th className="thd trn">{worker.Pnumber}</th>
        </tr>
        <tr>
          <th className="thd">Employee Type</th>
          <th className="thd">{worker.type}</th>
        </tr>
        <tr>
          <th className="thd trn">Gender</th>
          <th className="thd trn">{worker.gender}</th>
        </tr>
        <tr>
          <th className="thd">Additional Information</th>
          <th className="thd">{worker.addinfo}</th>
        </tr>
      </thead>
    </table>
    <div className="btn1">
    <Link to={`/update/proflie/${worker.nic}`}>
    <Button variant="contained" color="primary" className="btn11">Update User Details</Button>
    </Link>
    </div>
    <div className="btn2">
    <Button variant="contained" color="primary" className="btn11" onClick={drop}>Delete This Proflie</Button>
    </div>
  </div>
  )
}