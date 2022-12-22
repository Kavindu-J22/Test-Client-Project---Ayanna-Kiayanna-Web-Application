import React,{ useState,useEffect } from "react";
import {useParams } from 'react-router';
import "./Profileupdate.css"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
      },
    },
  }));

export default function Profileupdate(){

  function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
  }
    
    const classes = useStyles();

    let history = useHistory();

    const {nic}=useParams();

    const [fname,setfname] = useState('');
    const [sname,setsname] = useState('');
    const [email,setemail] = useState('');
    const [NIC,setNIC] = useState('');
    const [position,setposition] = useState('');
    const [Pnumber,setPnumber] = useState('');
    const [gender,setgender] = useState('');
    const [type, settype] = useState('');
    const [addinfo,setaddinfo] = useState('');

    const [wPnumber, setwPnumber] = React.useState(false)

    const fvalue=(event)=>{
        setfname(event.target.value);
      }
      const svalue=(event)=>{
        setsname(event.target.value);
      }
      const evalue =(event) => {
        setemail(event.target.value);
      };
      
      const pvalue=(event)=>{
        setposition(event.target.value);
      }
      const numbervalue=(event)=>{
        setPnumber(event.target.value);
      }
      const dropdown = (event) => {
        settype(event.target.value);
      };
      const addinfovalue=(event)=>{
        setaddinfo(event.target.value);
      }
      const nicvalue=(event)=>{
        setNIC(event.target.value);
      }
      const gvalue=(event)=>{
        setgender(event.target.value);
      }

      useEffect(()=>{
        getUsers();
      },[])

      function getUsers(){
        // useEffect(()=>{
        let mounted = true;
        fetch(`http://localhost:8070/staff/profile/${nic}`)
        .then(res=> res.json())
        .then((result)=>{
          if(mounted){
          setfname(result.fname)
          setsname(result.sname)
          setemail(result.email)
          setNIC(result.nic)
          setposition(result.position)
          setPnumber(result.Pnumber)
          settype(result.type)
          setaddinfo(result.addinfo)
          setgender(result.gender)

        //   setCfname(result.fname)
          }
        })
         return () => mounted = false;
      }

      const fromhandler =(event)=>{
        //event.preventDefault();
        const data ={fname,sname,email,position,Pnumber,type,addinfo,gender,NIC}
        
        if(data.Pnumber.length<10){
          setwPnumber(true);
          event.preventDefault();
        }
        else{
          axios.put(`http://localhost:8070/staff/update/proflie/updatestaff/${nic}`,data)
          .then(res=>{
            alert("Employee Updated Successfully");
            console.log(data);
          })
          .catch(err=>{
            alert("Database Error");
          })
        }
      }

      const handleClose = () => {
        setwPnumber(false);
      }
      
      function back(){
        history.push(`/proflie/${nic}`)
     }

    return(
        <div className="newstaff">
            <form className={classes.root} autoComplete="false" onSubmit={fromhandler}>
                <h1 className='topic'>Profile Update</h1>
                <TextField id="fname" label="Employee First Name" variant="outlined" className='textb' value={fname} onChange={fvalue} />
                <TextField id="sname" label="Employee Second Name" variant="outlined" className='textb' value={sname} onChange={svalue} required/><br></br>
                <TextField type="email" id="email" label="Employee E-mail Address" variant="outlined" className='textb' value={email} onChange={evalue} required/>
                <TextField id="position" label="Employee Position" variant="outlined" className='textb' value={position} onChange={pvalue} required/><br/>
                <TextField id="Pnumber" label="Employee Phone Number" variant="outlined" className='textb' type="number" value={Pnumber} onChange={numbervalue} required/>
                <TextField disabled id="nic" label="Employee NIC" variant="outlined" className='textb' value={NIC} onChange={nicvalue} required/><br/>
                <TextField disabled id="gender" label="Employee Gender" variant="outlined" className='textb' value={gender} onChange={gvalue} required/><br/>
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
                <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />} className='btn'color="primary" > Submit </Button><br/><br/>
                <Button variant="contained" color="primary" className='btn' onClick={back}>Back to page</Button>
                </div>
                </form>

                <Snackbar open={wPnumber} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="warning">Please Enter the Valid Phone Number</Alert>
                </Snackbar>
        </div>
    )
}