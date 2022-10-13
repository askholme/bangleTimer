(function(back) {
  var FILE = "timer.json";
  // Load settings
  var settings = Object.assign({
    interval: 60,
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  // Show the menu
  E.showMenu({
    "" : { "title" : "interval Timer" },
    "< Back" : () => back(),
    'Interval in minutes': {
      value: !!settings.interval,  // !! converts undefined to false
      min: 0, max: 120,
      onchange: v => {
        settings.interval = v;
        writeSettings();
      }
    }
  });
})(load)
