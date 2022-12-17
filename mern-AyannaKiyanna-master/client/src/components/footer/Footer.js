import React, {useContext, useState} from 'react'
import './footer.css'
import {GlobalState} from '../../GlobalState'

import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer-content">
          <h3
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: "2em"
            }}
          >
            <em>true</em>FOOD
          </h3>
          <p>trueFood is a registered company under Hexaview Tech Pvt. Ltd.</p>
          <div className="sub">
            <p>
              <b>Company</b>
              <p>About</p>
              <p>Blog</p>
            </p>
            <p>
              <b>For Foodies</b>
              <p>Code of conduct</p>
              <p>Community</p>
            </p>
            <p>
              <b>For Restaurant</b>
              <p>Restaurant</p>
              <p>Business</p>
            </p>
            <p>
              <b>For You</b>
              <p>Privacy</p>
              <p>Security</p>
              <p>Terms</p>
            </p>
            <div>
              <b>Social links</b>
              <div>
                <AiFillFacebook />
                <AiFillTwitterCircle />
                <AiFillInstagram />
              </div>
              <div>
                <AiFillApple />
                <FaGooglePlay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer