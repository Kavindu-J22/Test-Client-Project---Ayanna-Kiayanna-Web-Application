import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StyleView.css";

import CancelIcon from '@material-ui/icons/Cancel';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import { useReactToPrint } from 'react-to-print';
// import { Link } from "react-router-dom"
// import emailjs from 'emailjs-com'


 
 export default function ViewOnlinePayment() {
   const [search, setsearch] = useState("");


    const [classes, setclasses] = useState([
    {
      
      student_id: "",
      classid: "",
      month:"",
      amount:"",
      cvc:"",
      expiry:"",
      name:"",
      number:"",
            
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:8070/online/get")
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

  


function onDelete(student_id,classid,month,amount,cvc,expiry,name, number) {
    axios
      .delete(`http://localhost:8070/online/delete/${student_id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Class");
        
      })
      .catch((err) => {
        alert(err.message);
      });
      const NewOnlinePayment = {
            student_id,
            classid,
            month,
            amount,
            cvc,
            expiry,
            name,
            number,
                     
        }

        
        axios.post("http://localhost:8070/rejectpayments/add", NewOnlinePayment).then(()=>{
            alert("Payment Added")

            console.log(NewOnlinePayment)
            }).catch((err)=>{
            alert(err)
        })
  }

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
      <tr key={index} selectable={false}>
       
        <td>{classes.student_id}</td>
        <td>{classes.classid}</td>
        
        <td>{classes.month}</td>
        
        <td>{classes.amount}</td>
        <td>{classes.cvc}</td>
        <td>{classes.expiry}</td>
        <td>{classes.name}</td>
        <td>{classes.number}</td>
       
        <td>
            <CancelIcon  onClick={() => onDelete(classes.student_id,classes.classid, classes.month, classes.amount, classes.cvc, classes.expiry, classes.name, classes.number)} style={{fontSize:'50px',color:'red'}}/>
            </td>
        
      </tr>
    );
  };

  
   return (
    
     <div className="newUser">
     
       
      <input
          placeholder="Search Class ID"
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
               <th>CVC</th>
               <th>Expire Date</th>
               <th>Name</th>
               <th>Number</th>
              
               <th>Action</th>
               

             </tr>
           </thead>
           <tbody>
             
{classes
                .filter((val) => {
                  if (search === "") return val;
                  else if (
                    val.classid.toLowerCase().includes(search.toLowerCase())
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
