// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import './select2.css';
import logo from '../../logo1.png'

function Select2() {
  return (
    <div>
    <div className="bg-image"></div>
    <div className="square2"></div>
    <img id="logo"src={logo} />
    <div id="box2"></div>
   <section className="hero-section">
      <div className="card-grid">
        <a className="card" href="#">
          <div className="card__background"></div>
          <div className="card__content"></div>
        </a>
        <a className="card" href="#">
        <div className="card__background2"></div>
          <div className="card__content"></div>
        </a>
      </div>
  </section>
    <a href="#" className="button button-back"><span5>&lt;</span5></a>
    <button><a href="#" className="custom-btn btn-11"><span2>START</span2></a></button>
    </div>
  );
}

export default Select2;