import { useState,useEffect } from "react";
import "./allowance.css"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useParams } from 'react-router';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
  },
}));

export default function Allowance(){
  
  let history = useHistory();

  const classes = useStyles();
  const {nic}=useParams()

  const [fname,setfname]=useState('');
  const [sname,setsname]=useState('');
  const [ni,setnic]=useState('');
  const [email,setemail]=useState('');
  const [pnumber,setpnumber]=useState('');
  const [date,setdate]=useState('');
  const [position,setposition]=useState('');
  const [amount,setamount]=useState('');

  const datepicker=(event)=>{
    setdate(event.target.value);
  }

  const price=(event)=>{
    setamount(event.target.value);
  }

  useEffect(()=>{
    let mounted = true;
      fetch(`http://localhost:8070/staff/profile/${nic}`)
      .then(res=> res.json())
      .then((result)=>{
        if(mounted){
        setfname(result.fname);
        setsname(result.sname);
        setnic(result.nic);
        setpnumber(result.Pnumber)
        setposition(result.position)
        setemail(result.email);
        
        }
      })
      return () => mounted = false;
  })

  const submitandler =(event)=>{
    //event.preventDefault();
    const data ={fname,sname,nic,email,amount,date}
    
      axios.post(`http://localhost:8070/staffallowance/addallowance`,data)
      .then(res=>{
        alert("Allowance Added Successfully");
        console.log(data);
      })
      .catch(err=>{
        alert("Database Error");
      })
  }

  function back(){
      history.push(`/proflie/${nic}`)
   }

  return(
    <div className="newstaff">
      <form className={classes.root} autoComplete="false" onSubmit={submitandler}>
        <h1 className="topic">Empoolye Allowance</h1>
      <TextField disabled label="Empoolye Frist Name" value={fname} variant="outlined" className="textbox"/>
      <TextField disabled label="Empoolye Second Name" value={sname} variant="outlined" className="textbox"/><br/>
      <TextField disabled label="Empoolye NIC" value={ni} variant="outlined" className="textbox"/>
      <TextField disabled label="Empoolye Email" value={email} variant="outlined" className="textbox"/><br/>
      <TextField disabled label="Empoolye Phone Number" value={pnumber} variant="outlined" className="textbox"/>
      <TextField disabled label="Empoolye Position" value={position} variant="outlined" className="textbox"/><br/>
      <TextField type="month" variant="outlined" label="Enter the allowance given month" className="datebox" value={date} onChange={datepicker} required InputLabelProps={{shrink: true,}}/>
      <div className="textboxamount">
      <FormControl className="amount" variant="outlined">
          <InputLabel>Amount</InputLabel>
          <OutlinedInput type="number" value={amount} onChange={price} required startAdornment={<InputAdornment position="start" >Rs.</InputAdornment>} labelWidth={60}/>
        </FormControl>
        </div>
        <div className="add">
        <Button type="submit" variant="contained" color="primary" >Submit the Allowance</Button>
        </div>
        <div className="back">
        <Button variant="contained" color="primary" onClick={back}>Back to page</Button>
        </div>
      </form>
    </div>
  )
}