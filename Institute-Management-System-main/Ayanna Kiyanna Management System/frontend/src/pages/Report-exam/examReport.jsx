import React from 'react'
import Header from '../../components/Headers/TeacherHeader/tHeader'
import * as ReactBootStrap from "react-bootstrap";

function ExamReport() {
    return (
        <div>
            <Header/>

         

           <div>
                <input placeholder="Exam name" style={{marginLeft:'50px',marginTop:'50px'}}/>
                <input type='submit' value='search' style={{width:'100px',marginLeft:'20px'}}/>
                 <input type='submit' value='Download Results' style={{width:'250px',marginLeft:'55%',backgroundColor:'red'}}/>

           </div>
            
            
            <div style={{marginLeft:"42%",width:'230px'}}>
                <h4 style={{ textAlign:'center',marginTop:'50px' }}>Select mark range</h4><br/>
                <label >From</label>
                <input style={{width:"70px",marginLeft:'10px'}}/>
                <label style={{ marginLeft:'15px' }}>To</label>
                <input style={{width:"70px",marginLeft:'10px'}}/>

               <input type="submit" value="Genarate"  style={{marginTop:'20px',width:'230px',backgroundColor:'greenyellow'}}/> 
            </div>
            

             {/* result table */}
      <ReactBootStrap.Table
        striped
        bordered
        hover
        style={{ marginLeft: "150px", width: "80%", marginTop: "20px" }}
      >
        <thead className="tHead">
          <tr>
            <th >Student ID</th>
            <th>Student Name</th>
            <th>Result</th>
            <th>Grade</th>
            
          </tr>
        </thead>
        <tbody></tbody>
      </ReactBootStrap.Table>

        </div>
    )
}

export default ExamReport
