import React from "react";
import axios from "axios";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Deletebtn(props) {

  function Click() {
    const sid = props.sid;
    // alert(mess)
  

    axios
      .delete(`http://localhost:5000/teacher/results/delete/${sid}`)
      .then((res) => {
        alert("Deleted!");
      })
      .catch();
  }
  return (
    <div>
   
        <DeleteForeverIcon 
          style={{ fontSize: "30px", color: "red", float:"right"}}
          type = "submit"
          onClick={Click.bind(props.sid)}/>
        
    </div>
  );
}
export default Deletebtn;
