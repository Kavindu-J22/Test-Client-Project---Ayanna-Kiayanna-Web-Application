import React from 'react';
import Header from "../../components/Header/Header";
import BG from'../../assets/images/portalbg.png';
import Listimg from '../../assets/images/list.png';
import Searchimg from '../../assets/images/search.png';
import './examportal.css';
import {Link} from 'react-router-dom';

function Examportal() {
    return (
        <div>
                <Header/>
                <h1 className="header12"> Exam Portal</h1>

                <img className="bg-img" src={BG} alt='bg img'/>
                <div className="textDev">
                    <h3 style={{fontSize:'25px',lineHeight:'35px',marginTop:'10px' }}>
                        Don't stress yourself.<br/>
                        You are destined to<br/>
                        pass this exam with<br/>
                        flying colors.<br/>
                        Good luck.
                    </h3>
                </div>

                <div className="icon-set12">
                   <Link to='/student/goexam'> <img style={{paddingRight:'50px'}} src={Searchimg} alt="view exam"/></Link>
                   <Link to='/student/goresult'> <img style={{paddingLeft:'60px'}} src={Listimg} alt="view result"/></Link>
                    <div style={{marginTop:'10px'}}>
                        <h3 style={{float:'left',fontSize:'22px',marginLeft:'15px',fontFamily: 'sans-serif,roboto'}}>View Exam</h3>
                        <h3 style={{float:'right',fontSize:'22px',marginRight:'10px',fontFamily: 'sans-serif,roboto'}}>View Results</h3>
                    </div>
                    
                    
                </div>
                
                   
                
                
            
        </div>
    )
}
export default Examportal;