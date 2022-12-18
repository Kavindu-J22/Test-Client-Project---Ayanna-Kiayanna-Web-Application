import Logo from "../../assets/images/logo.png";
import './header.css'
import React from "react";

export default function Header() {
  return (
    <div className="header-background">
      <div className="logo-name">
        <img src={Logo} className="logo" alt="logo" />
        <h1 className="lname">Global Education</h1>
      </div>
    </div>
  );
}
