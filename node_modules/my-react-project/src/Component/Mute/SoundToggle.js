import React, { useState } from "react";
import '../Mute/soundtoggle.css'

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleClick = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  return (
    <>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
      <div className={`unmuted toggle-sound ${isMuted ? "sound-mute" : ""}`} href="#" onClick={handleClick}>
        <div className="tooltip--left sound" data-tooltip="Turn On/Off Sound">
          <div className="sound--icon fa fa-volume-off"></div>
          <div className="sound--wave sound--wave_one"></div>
          <div className="sound--wave sound--wave_two"></div>
          <div className="sound--wave sound--wave_three"></div>
        </div>
      </div>
    </>
  );
}
    
export default SoundToggle;
