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

  return (
    <div className="container">
      <div className="panel">
        <div className="action">
          <div className="command">
            <span100 className="symbol">$</span100>
            <input
              className="in"
              type="text"
              placeholder="type . . ."
              autoFocus
              onKeyDown={handleInput}
              ref={inputRef}
            />
          </div>
          <div className="output">{output}</div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
