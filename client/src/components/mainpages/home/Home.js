import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import './home.css'

function Home(){
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return(
        <div className='home'>
            <h1>Hello Home..</h1>
        </div>
    )
}
export default Home