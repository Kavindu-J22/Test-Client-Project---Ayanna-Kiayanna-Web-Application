import React,{ useState,useEffect } from "react";
import {useParams } from 'react-router';
import "./paysalary.css"
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
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

export default function Paysalary(){
    
  let history = useHistory();

    const classes = useStyles();

    const {nic}=useParams();

    const [fname,setfname] = useState('');
    const [sname,setsname] = useState('');
    const [email,setemail] = useState('');
    const [NIC,setNIC] = useState('');
    const [position,setposition] = useState('');
    const [type, settype] = useState('');
    const [allowance,setallowance] = useState(0);
    const [basicsalary,setbasicsalary]=useState(0);
    const [date,setdate]=useState('');

    const [pop, setpop] = React.useState(false)
    const [add, setadd] = React.useState(false)

    const fvalue=(event)=>{
        setfname(event.target.value);
      }
      const svalue=(event)=>{
        setsname(event.target.value);
      }
      const evalue =(event) => {
        setemail(event.target.value);
      }
      const pvalue=(event)=>{
        setposition(event.target.value);
      } 
      const gtype = (event) => {
        settype(event.target.value);
      };
      const allowancevalue=(event)=>{
        setallowance(event.target.value);
      }
      const nicvalue=(event)=>{
        setNIC(event.target.value);
      }
      const bvalue=(event)=>{
        setbasicsalary(event.target.value);
      }

      function Alert(props) {
          return <MuiAlert variant="filled" {...props} />;
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
            settype(result.type)

        //   setCfname(result.fname)
          }
        })
         return () => mounted = false;
      }

    const datepicker=(event)=>{
        setdate(event.target.value);
      }
      
      const getUsers2=(event)=>{
        event.preventDefault();
        axios.get(`http://localhost:8070/staffallowance/viewallowance/${nic}/${date}`)
        .then((res)=>{
          if(res.data==null){
            // alert("No Allowance Given!!");
            setpop(true);
              setallowance("");
          }
          else{
            setallowance(res.data.amount)
            setadd(true)
          }
        })
      }
  
      const fromhandler =(event)=>{
        //event.preventDefault();
        const data ={fname,sname,email,NIC,position,type,allowance,basicsalary,date}
          axios.post(`http://localhost:8070/staffpaysalary/paysalary`,data)
          .then(res=>{
            alert("Pay Successfully");
            console.log(data);
          })
          .catch(err=>{
            alert("Database Error");
          })
      }

      function back(){
        history.push(`/proflie/${nic}`)
     }
     const handleClose = () => {
      setpop(false);
      setadd(false);
     }

    const b=parseInt(basicsalary)
    
    return(
        <div className="newstaff">
            <form className={classes.root} autoComplete="false" onSubmit={fromhandler}>
                <h1 className='topic'>Empoolye Pay Salary</h1>
                <TextField disabled id="fname" label="Employee First Name" variant="outlined" className='textb' value={fname} onChange={fvalue} />
                <TextField disabled id="sname" label="Employee Second Name" variant="outlined" className='textb' value={sname} onChange={svalue} required/><br></br>
                <TextField disabled type="email" id="email" label="Employee E-mail Address" variant="outlined" className='textb' value={email} onChange={evalue} required/>
                <TextField disabled id="position" label="Employee Position" variant="outlined" className='textb' value={position} onChange={pvalue} required/><br/>
                <TextField disabled id="nic" label="Employee NIC" variant="outlined" className='textb' value={NIC} onChange={nicvalue} required/>
                <TextField disabled id="type" label="Employee Type" variant="outlined" className='textb' value={type} onChange={gtype} required/><br/>
                <TextField disabled id="allowance" label="Employee Total Allowance" variant="outlined" className='textb' value={allowance} onChange={allowancevalue} required/>
                <TextField type="month" variant="outlined" label="Enter the allowance given month" className="paydatebox" value={date} onChange={datepicker} required InputLabelProps={{shrink: true,}}/>
                <button onClick={getUsers2} className="checkbtn">Check</button><br/>
                <div className="btestbox">
                <FormControl className="btestboxw" variant="outlined">
                <InputLabel>Amount</InputLabel>
                <OutlinedInput type="number" value={basicsalary} onChange={bvalue} required  startAdornment={<InputAdornment position="start" >Rs.</InputAdornment>} labelWidth={60} />
                </FormControl>
                </div>
                <div className="go">
                <Button type="submit" variant="contained" startIcon={<CloudUploadIcon/>} className='btn'color="primary"> Submit </Button><br/><br/>
                <Button variant="contained" color="primary" className='btn' onClick={back}>Back to page</Button>
                </div>
                {/* <div className="go">
                <Button variant="contained" className='btn' color="primary"> Reset </Button>
                </div> */}
                </form>
                <h2 className="total">Total Employee Salary</h2><br/>
                <h2 className="totalvalue"> Rs.{allowance + b}.00</h2>

                <Snackbar open={pop} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="warning">No Allowance Given</Alert>
                </Snackbar>
                <Snackbar open={add} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success">Allowance Has Been Added</Alert>
                </Snackbar>
        </div>
    )
}