import React from "react";
import "./addResultsPop.css";
import CancelIcon from "@material-ui/icons/Cancel";

function addResults(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner2">
        <CancelIcon
          style={{ fontSize: "30px", color: "red", float: "right" }}
          onClick={() => props.setTrigger(false)}
        />

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default addResults;
