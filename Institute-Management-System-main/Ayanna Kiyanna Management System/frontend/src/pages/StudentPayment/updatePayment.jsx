import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pdetails.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom"
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CancelIcon from '@material-ui/icons/Cancel';
// import emailjs from 'emailjs-com'


 
 export default function UpdatePayment() {
  const [search, setsearch] = useState("");


  const [classes, setclasses] = useState([
    {
      
      student_id: "",
      classid: "",     
      month:"",     
      bankname:"",
      branch:"",
      email:"",
      contactnumber:"",
      amount: "",
      date:"",
      paymentslip: ""
      
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:5000/rejectpayment/get")
        .then((res) => {
          console.log(res);
          setclasses(res.data);
          
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getclasses();
  },[]);

  


// function onDelete(student_id) {
//     axios
//       .delete(`http://localhost:8070/payment/delete/${student_id}`)
//       .then((res) => {
//         console.log(res);
//         alert("Delete Class");
        
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   }

//     function sendEmail(e){
//       e.preventDefault();
  
//       emailjs.sendEmail('service_rtdh319',
//       'template_ec8vux8',
//       e.target,
//       'user_19CdALXRnjJXgtM6LB9CZ'
//       ).then(res=>{
//         console.log(res);
//       }).catch(err=>console.log(err));

// }

 

  const renderClass = (classes, index) => {
    return (
      <tr key={index}>
       
        <td>{classes.student_id}</td>
        <td>{classes.classid}</td>
        {/* <td>{classes.grade}</td>        
        <td>{classes.subject}</td> */}
        <td>{classes.month}</td>
        {/* <td>{classes.teachername}</td> */}
        <td>{classes.amount}</td>
        <td>{classes.bankname}</td>
        <td>{classes.branch}</td>
        <td>{classes.email}</td>
        <td>{classes.contactnumber}</td>
        <td>{classes.date}</td>
        <td><a href = {classes.paymentslip}>
          <button className = "button-view ">View Slip</button>
         </a></td>
        <td>
          
         <Link className = "btn btn--radius-2 btn--blue-2" to = {`/student/editPayment/${classes.student_id}`}>
           <i className="fas fa-edit"></i>&nbsp;Edit
         </Link>
       
        </td>
                
      </tr>
    );
  };


   return (
    
     <div className="newUser">
       <Header/>
     
       
      <input
          placeholder="Search Student ID"
          className="Ddown"
          type="text"
          onChange={(event) => setsearch(event.target.value)}
        />

       <div className="table-wrapper" >
         <table className="fl-table" >
           <thead>
             <tr>
               
               <th>Student ID</th>
               <th>Class ID</th>
              
               <th>Month</th>                          
               <th>Amount</th>
               <th>Bank Name</th>
               <th>Branch</th>
               <th>Email</th>
               <th>Contact Number</th>
               <th>Date</th>
               <th>Payment Slip</th>
               <th>Action</th>
               

             </tr>
           </thead>
           <tbody>
             
{classes
                .filter((val) => {
                  if (search === "") return 0;
                  else if (
                    val.student_id.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map(renderClass)}

             
           </tbody>
         </table>
       </div>
     </div>
   );
 }
