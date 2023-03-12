import React, { useState } from "react";
import '../Mute/SoundToggle.css'

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleClick = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  return (
    <button
      className={`toggle-sound ${isMuted ? "sound-mute" : ""}`}
      onClick={handleClick}
    >
      Toggle Sound
    </button>
  );
};

export default SoundToggle;
