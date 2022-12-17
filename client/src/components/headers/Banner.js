import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Close from './icon/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './header.css'



function Banner() {
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
                <li><Link to="/create_product">Create Item</Link></li>
                <li><Link to="/category">Create Categories</Link></li>
                <li><Link to="/">Update-Services</Link></li>
                <li><Link to="/">Update-Notifications</Link></li>
                <li><Link to="/">User-Feedbaks</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">Lets Work'</Link></li>
                <li><Link to="/">Notifications</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
           

            <ul style={styleMenu}>
                
                <li><Link to="/">{isAdmin ? 'Update-For Students' : 'For Students'}</Link></li>
                <li><Link to="/">{isAdmin ? 'Update-For Teachers' : 'For Teachers'}</Link></li>
                <li><Link to="/">{isAdmin ? 'Update-Others' : 'Entertainments & Others'}</Link></li>
                <li><Link to="/">{isAdmin ? 'Update-About' : 'About us'}</Link></li>
                <li><Link to="/">{isAdmin ? 'Update-Contact' : 'Cuntact us'}</Link></li>
                

                {isAdmin && adminRouter()}

                { isLogged ? loggedRouter() : <li><Link to="/login">Sign in ✥ Sign up</Link></li>
                
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>
            
        </header>
    )
   
}

export default Banner
