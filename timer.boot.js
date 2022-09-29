var wdTm;
var wdKc;
kickTimer = function() {
    E.kickWatchdog();
    
    if (BTN.read() && wcKc < 7) {
      wdTm = setTimeout(kickTimer, 40000);
    }
    wdKc++;
}
setWatch(function(e) {
    if (wdTm) {
      clearTimeout(wdTm);
      wdTm=0;
      //print("WD kick cleared");
    }
    wdKc=0;
    if (e.state){
      kickTimer();
      //print("BTN Pressed");
    }
}, BTN, {edge:"both", debounce:50, repeat:true});
