import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pdetails.css";


 
 export default function PaymentDetails() {
   const [search, setsearch] = useState("");


  const [classes, setclasses] = useState([
    {
      class_id: "",
      subject: "",
      teacher_name: "",
      amount: "",
      grade:""
      
    },
  ]);

  useEffect(() => {
    function getclasses() {
      axios
        .get("http://localhost:5000/getfees/get")
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
 

  const renderClass = (classes, index) => {
    return (
      <tr key={index}>
        <td>{classes.grade}</td>
        <td>{classes.class_id}</td>
        <td>{classes.subject}</td>
        <td>{classes.teacher_name}</td>
        <td>{classes.amount}</td>
        
      </tr>
    );
  };

   return (
    
     <div>
     
       
      <input
          placeholder="Search Grade"
          className="Ddown"
          type="text"
          onChange={(event) => setsearch(event.target.value)}
        />

       <div className="table-wrapper">
         <table className="fl-table">
           <thead>
             <tr>
               <th>Grade</th>
               <th>Class ID</th>
               <th>Subject</th>
               <th>Teacher Name</th>
               <th>Amount</th>

             </tr>
           </thead>
           <tbody>
             
            {classes.filter((val) =>{
                  if (search === "") return 0;
                  else if (
                    val.grade.toLowerCase().includes(search.toLowerCase())
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
