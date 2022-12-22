import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './profile cards.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import pic from './pic3.jpg'

// src={require(`../../assets/upload/${user.pic}`).default}

class Profile extends React.Component {

  state = {
    user: []
  };

  componentDidMount = () => {
    this.getdispay();
  };
 
  getdispay = () => {
    axios.get(`http://localhost:8070/staff/`)
      .then((response) => {
        const data = response.data;
        this.setState({ user: data });
        // alert('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  details = (user) => {
    return user.map((user, index) => (
      <div key={index}>
          <div className="max">
          <div className="containern rounded-lgn overflow-hiddenn shadow-lgn bg-whiten">
          <div className="relativen z-10n" style={{clipPath:"polygon(0px 0px, 100% 0px, 100% 117%, 0px calc(100% - 3vw))"}}>
          <img className="w-fulln" src={require(`./pic1.jpg`).default} alt="Profile" />
          <div className="text-centern absoluten w-fulln namen" style={{bottom: "4rem"}}>
          <p className="text-whiten tracking-wide uppercasen text-lg font-bold pn">{user.fname} {user.sname}</p>
          </div>
          </div>
          <div className="pb-6n pb-8n text-gray-600n text-centern" >
            <p className="text-smn pn">Employee NIC<br/>{user.nic}<br/></p>
            <div className="btnn">
            <Link to={`/proflie/${user.nic}`}>
            <Button variant="outlined" color="primary">More</Button>
            </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  useStyles = makeStyles({
    bullet: {
      //display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  render() {
    return(
      <div className="scroll-bgn newstaff">
      <div className="scroll-divn">
      <div className="scroll-objectn">
      <div className="wrapper-flex ">
        {this.details(this.state.user)}
      </div>
      </div>
      </div>
      </div>
    );
  }
}
export default Profile;