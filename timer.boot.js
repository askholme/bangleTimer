let wdTm;
let wdKc;
let wdBw;
if (wdBw) {
  clearWatch(wdBw);
  wdBw=0;
}var storage = require("Storage");
var FILESIZE = 2048;
var file = {
  name : "boot.log",
  offset : FILESIZE, // force a new file to be generated at first
};

// Add new data to a log file or switch log files
function saveData(txt) {
  var l = txt.length;
  if (file.offset+l>FILESIZE) {
    // need a new file...
    file.name = file.name=="log2"?"log1":"log2";
    // write data to file - this will overwrite the last one
    storage.write(file.name,txt,0,FILESIZE);
    file.offset = l;
  } else {
    // just append
    storage.write(file.name,txt,file.offset);
    file.offset += l;
  }
}

// Write some data

saveData('setting watch');

setTimeout(function () { saveData('in timeout'); wdBw = setWatch(function(e) {
  if (wdTm) {
    clearInterval(wdTm);
    wdTm=0;
    saveData("WD clear");
    //print("WD kick cleared");
  }
  wdKc=0;
  saveData("button touched");
  if (e.state){
      saveData("setting interval");
    wdTm = setInterval(function () {
        saveData("in interval");
        if (BTN.read() && wdKc < 7) {
          E.kickWatchdog();
          saveData("watchdog kicked");
          wdKc++;
        } else {
          clearInterval(wdTm);
          saveData("WD clear by interval");
        }
    },500);
    saveData("interval set");
    }
}, BTN, {edge:"both", debounce:50, repeat:true});},4000);
