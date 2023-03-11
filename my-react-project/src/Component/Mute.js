import React, { useEffect } from 'react';
import $ from 'jquery';

function Mute() {
  useEffect(() => {
    function handleClick(e) {
      $(e.target).toggleClass('sound-mute');
    }

    $(document).on('click', '.toggle-sound', handleClick);

    return () => {
      $(document).off('click', '.toggle-sound', handleClick);
    };
  }, []);

  return <button className="toggle-sound">Toggle Sound</button>;
}

export default Mute;
