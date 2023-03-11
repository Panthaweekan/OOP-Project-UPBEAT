// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './select1.css';
import logo from '../../logo1.png'
import panwhite from '../../p1wbg@2x.png'
import penblack from '../../p2wbg@2x.png'

function Select1() {
  return (
    <div>
    <div className="bg-image"></div>
    <div className="square"></div>
    <img id="logo"src={logo} />
    <div id="box1"></div>
   <section className="hero-section">
      <div className="card-grid">
        <a className="card" href="#">
          <div className="card__background"></div>
          <div className="card__content"></div>
        </a>
        <a className="card" href="#">
          <div classNAme="card__background2"></div>
          <div className="card__content"></div>
        </a>
      </div>
  </section>
    <a href="#" className="button button-back"><span>&lt;</span></a>
    <button><a href="#" className="custom-btn btn-11"><span>NEXT</span></a></button>
    </div>
  );
}

export default Select1;