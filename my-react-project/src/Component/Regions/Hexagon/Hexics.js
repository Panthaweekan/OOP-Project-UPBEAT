import React from 'react';
import PropTypes from 'prop-types';
import hexagonImage from './region@2x.png';
import './Hexice.css';

function Hexice({ onClick, namespace }) {
  return (
    <img
      src={hexagonImage}
      alt="Hexagon region"
      className="hex"
      onClick={onClick}
      key={namespace}
      draggable="false"
    />
  );
}

Hexice.propTypes = {
  onClick: PropTypes.func.isRequired,
  namespace: PropTypes.string.isRequired,
};

export default Hexice;
