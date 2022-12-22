import React from"react";
import Deletebtn from "./deleteButton";
//import "./request.css";
//import { MDBInput } from "mdbreact";
 //import Toast from 'react-bootstrap/Toast'
function Message(props){
    return(
          <div className={props.sender}>
            
            <div className="card">
              <div className="container">
                <h6 className="name">{props.sender}</h6>
                <Deletebtn s="user@gmail.com" mes={props.message} />
                <hr className="line"/> 
                <p>{props.message}</p> 
              </div>
            </div>
          </div>  

    )
}

export default Message;