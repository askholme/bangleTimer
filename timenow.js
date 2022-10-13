var settings = Object.assign({
  // default values
  interval: 60,
}, require('Storage').readJSON("timer.json", true) || {});

function do_buzz() {
  let i = 0;
  while (i <5) {
    Bangle.beep();
    Bangle.buzz();
    await new Promise(r => setTimeout(r, 200));
    i++;
  }
}

require("sched").setAlarm("intervalTimer", { // as a timer
  msg : "Time is up",
  timer : settings.interval * 60 * 1000, // 10 minutes
  js: "load('timenow.js')"
});
require("sched").reload();
