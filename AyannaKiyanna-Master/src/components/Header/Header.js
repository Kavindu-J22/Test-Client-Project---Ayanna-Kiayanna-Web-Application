import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import { Logo1 } from '../images/1aa.png'

export default class Header extends Component {
    render(){
        return(
            <header>
                <div className="Logo" >
                <img id="logo1" src={Logo1} alt="" width="30" />
                <h1><span>අ</span>යන්න කියන්න . . .</h1><br></br>
                <h2>
                    <Link to="/">✥- Sinhala Education Institute & Education Centre -</Link>
                    
                </h2>

                </div>
                
                <div>
                    
                </div>
            </header>
        );
    }
}