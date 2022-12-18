import React,{useState} from "react";
import axios from "axios";
//import "./request.css";
const DRequest = () => {
    const email="user@gmail.com"
    const sender="user@gamil.com"
    const [message,setmessage]=useState('')
  
  const formhandler = (event)=>{
    // event.preventDefault();
    
    const data={
        sender,
        message
    }
    const details={
        email,
        data
    }
    axios.put('http://localhost:8070/request/update',details)
    .then(res=>{
    })
    .catch(err=>{
        alert('error')
    })
    console.log(data)
  }

  return (
  
    <div>
      <form onSubmit={event=> formhandler(event)}> 
      <input type="text" className="message" value={message} onChange={(event)=>setmessage(event.target.value)} required placeholder="Enter your message here..."/>
      <input type="submit" className="send"   value="Send"/>
      </form>
    </div>
  );
}


export default DRequest;