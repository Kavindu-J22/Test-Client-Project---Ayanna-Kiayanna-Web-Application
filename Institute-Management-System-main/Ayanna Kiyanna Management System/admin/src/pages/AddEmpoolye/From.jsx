import React, { useState } from 'react';
import './From.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
}));

export default function AddstaffFrom() {

  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }

  const classes = useStyles();
  
  const [fname,setfname] = useState('');
  const [sname,setsname] = useState('');
  const [email,setemail] = useState('');
  const [nic,setnic] = useState('');
  const [position,setposition] = useState('');
  const [Pnumber,setPnumber] = useState('');
  const [type, settype] = useState('');
  const [gender,setgender] = useState('');
  const [addinfo,setaddinfo] = useState('');

  // const [open, setOpen] = React.useState(false)
  // const [pop, setpop] = React.useState(false)

  // const [wfname, setwfname] = React.useState(false)
  // const [wsname, setwsname] = React.useState(false)
  // const [wemail, setwemail] = React.useState(false)
   const [wnic, setwnic] = React.useState(false)
  // const [wposition, setwposition] = React.useState(false)
   const [wPnumber, setwPnumber] = React.useState(false)
  // const [wtype, setwtype] = React.useState(false)
  // const [gtype, setgtype] = React.useState(false)
  
  
  const fvalue=(event)=>{
    setfname(event.target.value);
  }
  const svalue=(event)=>{
    setsname(event.target.value);
  }
  const evalue =(event) => {
    setemail(event.target.value);
  };
  const nicvalue=(event)=>{
    setnic(event.target.value);
  }
  const pvalue=(event)=>{
    setposition(event.target.value);
  }
  const numbervalue=(event)=>{
    setPnumber(event.target.value);
  }
  const dropdown = (event) => {
    settype(event.target.value);
  };
  const gendedrop=(event)=>{
    setgender(event.target.value);
  }
  const addinfovalue=(event)=>{
    setaddinfo(event.target.value);
  }

  const fromhandler =(event)=>{
    const data ={fname,sname,email,nic,position,Pnumber,type,gender,addinfo}

    if (data.Pnumber.length<10){
      setwPnumber(true);
      event.preventDefault();
    }else
    if(data.nic.length<10 || data.nic.length>12){
      setwnic(true);
      event.preventDefault();
    }
    //  if(data.fname===''){
    //      setwfname(true);
    //  }else
    //  if(data.sname===''){
    //   setwsname(true);
    //  }else
    //  if(data.email===''){
    //   setwemail(true);
    //  }else
    //  if(data.nic===''){
    //   setwnic(true);
    //  }else
    //  if(data.position===''){
    //   setwposition(true);
    //  }else
    //  if(data.Pnumber===''){
    //   setwPnumber(true);
    //  }else
    //  if(data.type===''){
    //   setwtype(true);
    //  }else
    //  if(data.gender===''){
    //   setgtype(true);
    //  }
     else{
      axios.post('http://localhost:8070/staff/addstaff',data)
      .then(res=>{
        // setpop(true);
        alert("Employee Added Successfully");
        console.log(data);
      })
      .catch(err=>{
        // setOpen(true);
        alert("Database Error");
      })
    }
    //  event.preventDefault();
  }

   const handleClose = () => {
  //   setOpen(false);
  //   setpop(false);
  //   setwfname(false);
  //   setwsname(false);
  //   setwemail(false);
     setwnic(false);
  //   setwposition(false);
     setwPnumber(false);
  //   setwtype(false);
  //   setgtype(false);
   };

  return (
    <div className="newstaff">
    <form className={classes.root} autoComplete="false" onSubmit={event=>fromhandler(event)}>
    <h1 className='topic'>Add Employee</h1>
    <TextField id="fname" label="Enter the Employee First Name" variant="outlined" className='textb' value={fname} onChange={fvalue} required/>
      <TextField id="sname" label="Enter the Employee Second Name" variant="outlined" className='textb' value={sname} onChange={svalue} required/><br></br>
      <TextField type="email" id="email" label="Enter the Employee E-mail Address" variant="outlined" className='textb' value={email} onChange={evalue} required/>
      <TextField id="nic" label="Enter the Employee NIC" variant="outlined" className='textb' value={nic} onChange={nicvalue} required/><br></br>
      <TextField id="position" label="Enter the Employee Position" variant="outlined" className='textb' value={position} onChange={pvalue} required/>
      <TextField id="Pnumber" label="Enter the Employee Phone Number" variant="outlined" className='textb' type="number" value={Pnumber} onChange={numbervalue} required/><br/>
      <div className="dropd">
      <div className="select">
      <select id="etype" value={gender} onChange={gendedrop} className='selectn' required>
        <option>Select the Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      </div>
     </div>
     <div className="dropd">
      <div className="select">
      <select id="etype" value={type} onChange={dropdown} className='selectn' required>
        <option>Select the Employee Type</option>
        <option value="Permanent">Permanent</option>
        <option value="Non-Permanent">Non-Permanent</option>
      </select>
      </div>
     </div>
      <TextField id="addinfo" label="Enter the Employee Additional Information" multiline rows={3} variant="outlined" className='addin' value={addinfo} onChange={addinfovalue}/>
      <div className="go">
      <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />} className='btn'color="primary"> Submit </Button>
      </div>
    </form>
    
    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">Database Error</Alert>
      </Snackbar>
    <Snackbar open={pop} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">Employee Added Successfully</Alert>
    </Snackbar>
    <Snackbar open={wfname} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee First Name</Alert>
    </Snackbar>
    <Snackbar open={wsname} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee Second Name</Alert>
    </Snackbar>
    <Snackbar open={wemail} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee E-mail Address</Alert>
    </Snackbar>
    <Snackbar open={wnic} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee NIC</Alert>
    </Snackbar>
    <Snackbar open={wposition} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee Position</Alert>
    </Snackbar>
    <Snackbar open={wPnumber} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Employee Phone Number</Alert>
    </Snackbar>
    <Snackbar open={wtype} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Select the Employee Type</Alert>
    </Snackbar>
    <Snackbar open={gtype} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Select the Gender</Alert>
    </Snackbar> */}
    <Snackbar open={wPnumber} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter the Valid Phone Number</Alert>
    </Snackbar>
    <Snackbar open={wnic} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">Please Enter Valid Employee NIC</Alert>
    </Snackbar>
    </div>
    
  );
}