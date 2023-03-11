import React, { useState } from 'react';
import HexGrid from './HexGrid'; // Import the HexGrid component from a separate file
import ReactDOM from 'react-dom';
import './playpage.css';
import './mute.css';
import './command.css';
import coin from '../../money.png'
import pen1 from '../../p1.png'

function Playpage() {
  const [soundMuted, setSoundMuted] = useState(false); // State to keep track of sound muted status

  function toggleSound() {
    setSoundMuted(!soundMuted);
  }

  return (
    <div className="gameplay-upbeat">
      <div className="turn">
        <h1>Turn : </h1>
      </div>
      <div className="plan">
        <h1>player 1 plan's</h1>
      </div>
      <img id="money-img" src={coin} />
      <img id="p1-img" src={pen1} />
      <div className="box"></div>
      <div className="square"></div>
      <div className="sq"></div>

      <div className="right-button-container">
        <div className="button-container right-button">
          <button className="custom-btn btn-3">
            <span>Player1</span>
          </button>
        </div>
        <div className="button-container right-button">
          <button className="custom-btn btn-3">
            <span>Player2</span>
          </button>
        </div>
      </div>

      <HexGrid /> {/* Render the HexGrid component */}

      <div className="countdown-wrapper">
        <div id="countdown" className="countdown"></div>
      </div>

      <div className="container">
        <div className="panel">
          <div className="action">
            <div className="command">
              <span className="symbol">$</span>
              <input className="in" type="text" placeholder="type . . ." autoFocus />
            </div>
            <div className="output"></div>
          </div>
        </div>
      </div>

      <div className={`unmuted toggle-sound${soundMuted ? ' sound-mute' : ''}`} onClick={toggleSound}>
        <div className="tooltip--left sound" data-tooltip="Turn On/Off Sound">
          <div className="sound--icon fa fa-volume-off"></div>
          <div className="sound--wave sound--wave_one"></div>
          <div className="sound--wave sound--wave_two"></div>
          <div className="sound--wave sound--wave_three"></div>
        </div>
      </div>
    </div>
  );
}

export default Playpage;
