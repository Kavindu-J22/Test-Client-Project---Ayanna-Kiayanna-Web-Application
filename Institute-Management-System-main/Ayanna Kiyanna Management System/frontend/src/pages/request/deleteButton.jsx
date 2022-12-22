import React from "react";
import axios from "axios";

function Deletebtn(props){
    const sender=(props.s)
    
    function Click(){
        const mess=(props.mes)
         alert(sender)
        
        axios.put(`http://localhost:8070/request/${sender}/${mess}`)
        .then(res=>{
        })
        .catch(err=>{
            alert('error')
        })
    }
    return(
        <div>
           
           <form onSubmit={Click.bind((props.mes))} >
                <input type="submit" value="remove" className="deleteBtn" id={props.send}/>
            </form>    
        </div>
    );
}
export default Deletebtn;