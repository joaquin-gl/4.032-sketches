// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  strokeCap(ROUND);
  frameRate(1);
  //PFont font;
  //font = loadFont(courierstd.otf);
}


function draw() {
  background(255);
  
  push();
  translate(width/2, height/2);
  strokeWeight(6);
  var scaleMax = 115;
  
  push();
  translate(0, 0);
  var ms = map(minute(), 0, 60, 0, scaleMax);
  translate(-ms/2, -ms/2);
  rect(0, 0, ms, ms);
  pop();

  push();
  translate(ms/2, ms/2);
  var ss = map(second(), 0, 60, 0, scaleMax);
  rect(0, 0, ss, ss);
  pop();
  
  push();
  translate(-ms/2, -ms/2);
  var hs = map(hour(), 0, 24, 0, scaleMax);
  translate(-hs, -hs);
  rect(0, 0, hs, hs);
  pop();
  
  pop();

  //noStroke();
  //fill(0);
  text(hoursMinutesSeconds(), width/2, height-10);

}

// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}


// format hours and minutes
function hoursMinutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}


// format hours, minutes, and seconds
function hoursMinutesSeconds() {
  return hoursMinutes() + ':' + nf(second(), 2);
}
