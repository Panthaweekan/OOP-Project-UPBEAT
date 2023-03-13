import React, { useState, useRef, useEffect } from 'react';
import '../Terminal/terminal.css'

const files = {
  "root": {
    "aboutme.txt": "-Get new shell, -Buy Milk",
    "passwords.txt": "gmail: p@ssword, reddit: hunter2",
    "projects": {
      "bio.txt": "cells organisms",
      "chem.txt": "ions protons"
    }
  }
};

function Terminal() {
  const [currentFolder, setCurrentFolder] = useState(files["root"]);
  const [path, setPath] = useState([]);
  const [output, setOutput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const inputRef = useRef(null);

  const handleInput = (e) => {
    if (e.which === 13) {
      const input = e.target.value.split(' ');
      const command = input[0];
      const parameters = input[1] || '';
      const result = execute(command, parameters);
      setOutput(result);
      e.target.value = '';
      e.target.blur();
    }
  };

  const execute = (command, parameters) => {
    console.log(command, parameters);
    if (window[command]) {
      return window[command](parameters);
    } else {
      return '';
    }
  };

  const cd = (folder) => {
    if (folder === '') {
      return '';
    }
    if (folder === '..') {
      if (path.length > 0) {
        setCurrentFolder((prev) => prev.upperFolder);
        setPath((prev) => prev.slice(0, -1));
      }
    } else if (typeof currentFolder[folder] === 'object') {
      setCurrentFolder(currentFolder[folder]);
      setPath((prev) => [...prev, folder]);
    } else {
      return `bash: cd: ${folder}: No such file or directory`;
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleDoneButtonClick = () => {
    setIsInputDisabled(true);
  };

  const handleEnableButtonClick = () => {
    setIsInputDisabled(false);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <div className="panel">
        <div className="action">
          <div className="command">
            <span100 className="symbol"></span100>
            <input
              className="in"
              type="text"
              placeholder="type . . ."
              autoFocus
              onKeyDown={handleInput}
              ref={inputRef}
              disabled={isInputDisabled}
            />
          </div>
          <div className="output">{output}</div>
        </div>
      </div>
      <div className="right-button-container1">
        {isInputDisabled ? (
          <div className="button-container1 right-button3">
            <button className="custom-btn4 btn-16" onClick={handleEnableButtonClick}>
              <span12>Revision</span12>
            </button>
          </div>
        ) : (
          <div className="button-container1 right-button2">
            <button className="custom-btn3 btn-15" onClick={handleDoneButtonClick}>
              <span12>Done</span12>
            </button>
          </div>
        )}
      </div>
      <div className="square5"></div>
    </div>
  );
}

export default Terminal;
