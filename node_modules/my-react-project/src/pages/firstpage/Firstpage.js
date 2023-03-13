// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './firstpage.css';
import logo from '../../logo1.png'

function Firstpage() {
  return (
    <div className="bg-image">
      <div className="content">
        <img src={logo} />
        <a href="#" style={{ fontFamily: 'Varela Round, sans-serif' }} ><span>press to start</span></a>
      </div>
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
      </div>
    </div>
  );
}

export default Firstpage;
