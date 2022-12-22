import axios from "axios";
import "./PaymentReportStyle.css";
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
//import { useReactToPrint } from 'react-to-print';
//import { Link } from "react-router-dom"
//import emailjs from 'emailjs-com'


 
 export default function PaymentReport() {
   const [search, setsearch] = useState("");

   const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const [classes, setclasses] = useState([
    {
      
      student_id: "",
      classid: "",
     
      month:"",
      amount:"",
      bankname:"",
      branch:"",
      email:"",
      contactnumber:"",
      
      date:"",
      paymentslip: ""
      
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:8070/payment/get")
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

  


function onDelete(student_id,classid,month,amount,bankname,branch,email,contactnumber,date,paymentslip) {
    axios
      .delete(`http://localhost:8070/payment/delete/${student_id}`)
      .then((res) => {
        console.log(res);
        alert("Delete Class");
        
      })
      .catch((err) => {
        alert(err.message);
      });
      const NewPayment = {
            student_id,
            classid,
            month,
            amount,
            bankname,
            branch,
            email,
            contactnumber,
            date, 
            paymentslip            
        }

        
        axios.post("http://localhost:8070/rejectpayments/add", NewPayment).then(()=>{
            alert("Added to My Payments")

            console.log(NewPayment)
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
        <td>{classes.bankname}</td>
        <td>{classes.branch}</td>
        <td>{classes.email}</td>
        <td>{classes.contactnumber}</td>
        <td>{classes.date}</td>
       
        
      </tr>
    );
  };


   return (
    
     <div className="newUser">
         <div>

        <button

          color="primary"

          variant="contained"

          className="button-view"

          onClick={handlePrint}

        >

          Download PDF

        </button>

      </div>
     
       
      <input
          placeholder="Search Class ID"
          className="Ddown"
          type="text"
          onChange={(event) => setsearch(event.target.value)}
        />

       <div className="table-wrapper" ref={componentRef} >
         <table className="fl-table022" >
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
