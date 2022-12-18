import React from 'react'
import './addExamPop.css'
import CancelIcon from '@material-ui/icons/Cancel';

function addExam(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <CancelIcon style={{fontSize:'30px',color:'red',float:'right'}} onClick={()=> props.setTrigger(false)}/>
                
                {props.children}
            </div>
        </div>
    ):"";
}

export default addExam;
