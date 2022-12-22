import React, { Component } from "react";
import axios from 'axios';
import "./request.css";
import Message from "./message";
import DRequest from "./request";
import Header from "../../components/Headers/TeacherHeader/tHeader";

class Request extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user: []
    }
  }
      componentDidMount = () => {
        this.getdispay();
      };
    
      getdispay = () => {
        axios.get('http://localhost:8070/request/user@gmail.com')
          .then((response) =>{
            const data = response.data;
            this.setState({ user:data});
            console.log('Data has been received!!');
          })
          .catch(() => {
            alert('Error retrieving data!!!');
          });
      }
    
      display = (user) => {
          return user.map((users,index) => (
          <div className="scrollbar" key={index}>
            
            {
              (typeof(users.chat)=='object')?
              <div>
                
                <div className="uheader"><p className="uhead"><span className="uhello">Hello...</span> <span className="uName">{users.email}</span> </p> </div>
                
                
                {
                  users.chat.map((subrow,k)=>
                  <div key={k}>
                    <Message sender={subrow.sender} message= {subrow.message}/>
                  </div>
                  )
                }
              </div>
              :
              null
            }
            

    
          </div>
        ));
      };
    
  render(){ 
  return (
    <div> 
        <Header/>
        <div id="objDiv" className="back">
          
          <div >
            {this.display(this.state.user)}
          </div>
          <DRequest/>
        </div>
    
    </div>
    

  );
  }
}

export default Request;