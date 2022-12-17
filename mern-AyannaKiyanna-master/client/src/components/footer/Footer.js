import React, {useContext, useState} from 'react'
import './footer.css'
import {GlobalState} from '../../GlobalState'

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>{`Ayanna - Kiyanna ${year}`}</footer>;
  };
  
  export default Footer;