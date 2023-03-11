import React, { useEffect } from 'react';
import $ from 'jquery';

function Command() {
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.which == 13) {
        $(e.target).prop('readonly', true);
        var input = $(e.target).val().split(" ");
        if (input[1]) {
            var output = execute(input[0], input[1]);
        } else {
            var output = execute(input[0], "");
        }
        $(".output").last().html(output)
        $(".panel").append($("<div class='action'>").html("<div class='action'><div class='command'><span class='symbol'>$</span><input class='in' type='text'></div><div class='output'></div></div>"));
        $(".in").last().focus();
      }
    }

    $(document).on('keypress', '.panel .in', handleKeyPress);

    return () => {
      $(document).off('keypress', '.panel .in', handleKeyPress);
    };
  }, []);

  function execute(command, parameters) {
    console.log(command, parameters);
    if (window[command]) {
        return window[command](parameters);
    } else {
        return;
    }
  }

  function ls() {
    var keys = [];
    for (var key in currentFolder) {
        if (currentFolder.hasOwnProperty(key)) { //to be safe
            keys.push(key);
        }
    }
    return keys.join(" ");
  }

  function cat(filename) {
    if (filename == "") {
        return "usage: cat file ...";
    }
    if (typeof currentFolder[filename] == "object") {
        return "cat: " + filename + " : Is a directory"
    }
    if (currentFolder[filename] == "") {
        return "";
    }
    if (currentFolder[filename]) {
        return currentFolder[filename];
    } else {
        return "cat: " + filename + " : No such file or directory"
    }
  }

  function cd(folder) {
    if (folder == "") {
        return "";
    }
    if (folder == "..") {
        if (path.length > 0) {
            currentFolder = upperFolder;
            path.pop();
        }
    } else if (typeof currentFolder[folder] == "object") {
        upperFolder = currentFolder;
        currentFolder = currentFolder[folder];
        path.push(folder);
    } else {
        return "bash: cd: " + folder + ": No such file or directory";
    }
  }

  function mkdir(folderName) {
    if (folderName != "") {
        currentFolder[folderName] = {};
        return "";
    } else {
        return "usage: mkdir directory ...";
    }
  }

  function touch(fileName) {
    currentFolder[fileName] = "";
  }

  function echo(string) {
    return string;
  }

  function rm(name) {
    delete currentFolder[name]
  }

  function help() {
    return "Commands: ls, cd, mkdir, echo, touch, rm, cat, pwd, help";
  }

  function pwd() {
    if (path.length == 0) {
        return "/"
    }
    return "/" + path.join("/")
  }

  return
}

export default Command;
