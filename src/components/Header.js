import React from 'react';

function Header() {
  return (
    <div className="Header">
      <div id="headerMain">
        <p id="headerName">Kyle Fasanella</p>
        <p id="headerSub">Modern Web Development</p>
      </div>
      <div id="nav">
        <p id="navLinks"><a href="#projects">Projects</a> | <a href="#aboutContact">Contact</a></p>
      </div>
    </div>
  );
}

export default Header;
