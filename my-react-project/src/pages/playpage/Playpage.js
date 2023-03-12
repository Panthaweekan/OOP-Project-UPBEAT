import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from '../../Component/Terminal/Terminal';
import SoundToggle from '../../Component/Mute/SoundToggle';

import './playpage.css';
import pen1 from '../../p1.png'
import coin from '../../money.png'
import Counter from '../../Component/Time/Counter';


function PlayPage() {
  return (
    <div>
      <div className="Terminal">
        <Terminal />
      </div>
      <div className="turn">
        <h1>Turn : </h1>
      </div>
      <div className="SoundToggle">
        <SoundToggle />
      </div>
      <div className="plan">
        <h1>player 1 plan's</h1>
      </div>
      <div className="Counter">
        <Counter />
      </div>
      <img id="money-img" src={coin} alt="money"/>
      <img id="p1-img" src={pen1} alt="player 1"/>    
      <div className="box"></div>
      <div className="square5"></div>
      <div className="sq"></div>

      <div className="right-button-container">
        <div className="button-container right-button">
          <button className="custom-btn btn-3">
            <span7>Player1</span7>
          </button>
        </div>
        <div className="button-container right-button">
          <button className="custom-btn btn-3">
            <span7>Player2</span7>
          </button>
        </div>
      </div>
    </div>
  );
}
// ReactDOM.render(<Terminal />, document.getElementById('root'));
// ReactDOM.render(<PlayPage />, document.getElementById('root'));

export default PlayPage;
