import React, { useState } from "react";
import '../Command/terminal.css'

const files = {
  root: {
    "aboutme.txt": "-Get new shell, -Buy Milk",
    "passwords.txt": "gmail: p@ssword, reddit: hunter2",
    projects: {
      "bio.txt": "cells organisms",
      "chem.txt": "ions protons",
    },
  },
};

const Terminal = () => {
  const [currentFolder, setCurrentFolder] = useState(files["root"]);
  const [path, setPath] = useState([]);
  const [history, setHistory] = useState([
    {
      command: "",
      output: "",
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const execute = (command, parameters) => {
    console.log(command, parameters);
    if (window[command]) {
      return window[command](parameters);
    } else {
      return;
    }
  };

  const ls = () => {
    const keys = Object.keys(currentFolder);
    return keys.join(" ");
  };

  const cat = (filename) => {
    if (filename === "") {
      return "usage: cat file ...";
    }
    if (typeof currentFolder[filename] === "object") {
      return `cat: ${filename}: Is a directory`;
    }
    if (currentFolder[filename] === "") {
      return "";
    }
    if (currentFolder[filename]) {
      return currentFolder[filename];
    } else {
      return `cat: ${filename}: No such file or directory`;
    }
  };

  const cd = (folder) => {
    if (folder === "") {
      return "";
    }
    if (folder === "..") {
      if (path.length > 0) {
        setCurrentFolder((prev) => {
          setPath((prevPath) => {
            return prevPath.slice(0, -1);
          });
          return prev.upperFolder;
        });
      }
    } else if (typeof currentFolder[folder] === "object") {
      setCurrentFolder((prev) => {
        setPath((prevPath) => {
          return [...prevPath, folder];
        });
        return {
          upperFolder: prev,
          currentFolder: prev[folder],
        };
      });
    } else {
      return `bash: cd: ${folder}: No such file or directory`;
    }
  };

  const mkdir = (folderName) => {
    if (folderName !== "") {
      setCurrentFolder((prev) => {
        return {
          ...prev,
          [folderName]: {},
        };
      });
      return "";
    } else {
      return "usage: mkdir directory ...";
    }
  };

  const touch = (fileName) => {
    setCurrentFolder((prev) => {
      return {
        ...prev,
        [fileName]: "",
      };
    });
  };

  const echo = (string) => {
    return string;
  };

  const rm = (name) => {
    setCurrentFolder((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const help = () => {
    return "Commands: ls, cd, mkdir, echo, touch, rm, cat, pwd, help";
  };

  const pwd = () => {
    if (path.length === 0) {
      return "/";
    }
    return `/${path.join("/")}`;
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const input = e.target.value.split(" ");
      const command = input[0];
      const parameters = input.slice(1).join(" ");
      const output = execute(command, parameters);
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          command: e.target.value,
          output: output,
        },
      ]);
      setHistoryIndex(history.length);
      e.target.value = "";
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        setHistoryIndex((prevIndex) => prevIndex - 1);
        e.target.value = history[historyIndex - 1].command;
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        setHistoryIndex((prevIndex) => prevIndex + 1);
        e.target.value = history[historyIndex + 1].command;
      } else {
        setHistoryIndex(history.length);
        e.target.value = "";
      }
    }
  };

  function execute(command, parameters) {
    switch (command) {
      case "ls":
        return ls(parameters);
      case "cat":
        return cat(parameters);
      case "cd":
        return cd(parameters);
      case "mkdir":
        return mkdir(parameters);
      case "touch":
        return touch(parameters);
      case "echo":
        return echo(parameters);
      case "rm":
        return rm(parameters);
      case "help":
        return help();
      case "pwd":
        return pwd();
      default:
        return `${command}: command not found`;
    }
  }

  return (
    <div className="terminal">
      <div className="output">{/* output of executed commands */}</div>
      <div className="input">
        <span className="prompt">$</span>
        <input type="text" onKeyDown={handleEnter} autoFocus />
      </div>
    </div>
  );
};

export default Terminal;