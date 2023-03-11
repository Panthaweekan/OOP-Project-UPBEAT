// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './howpage.css';
import logo from '../../logo1.png'

function Howpage() {
  return (
    <div>
    <div className="bg-image"></div>
    <div className="square"></div>
    <img id="logo"src={logo} />

    <div id="box1"></div>
    <button><a href="#" className="custom-btn btn-11"><span>NEXT</span></a></button>
    </div>
  );
}

export default Howpage;