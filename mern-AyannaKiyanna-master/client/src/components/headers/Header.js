import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import user from './icon/user.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Logo1 from './images/1aa.png'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="AK Logo"/>
            </div>

            <div className="logo">
                <img id="logo1" src={Logo1} alt="" width="30" />

                <h1><span>අ</span>යන්න කියන්න . . .</h1><br></br>

                <h2>
                    <Link to="/">{isAdmin ? '( Admin )' : '✥- Sinhala Education Institute & Education Centre -'}</Link>
                </h2>
                
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'View Home' : 'Home'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login<span> ✥ </span>Register</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                <div className="user-icon">
                    <Link to="/user">
                        <img src={user} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
