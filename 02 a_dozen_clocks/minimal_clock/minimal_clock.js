// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  strokeCap(ROUND);
  frameRate(1);
}


function draw() {
  background(255);

  push();
  translate(width/2, height/2);
  noFill();
  stroke(0);
  
  // ticks
  push();
  for (var i = 0; i < 12; i = i+1) {
    line(0, 150, 0, 160);
    rotate(PI/6);
  }
  pop();

  var innerSize = 60;

  push();
  fill(0);
  textSize(50);
  var hourSize = 40;
  var hourAngle = map(hour() % 12,  0, 12,  0, TAU);
  text(twelveHour(), hourSize*sin(hourAngle), -hourSize*cos(hourAngle));
  textSize(32);
  var minuteSize = 100;
  var minuteAngle = map(minute(),  0, 60,  0, TAU);
  text(minute(), minuteSize*sin(minuteAngle), -minuteSize*cos(minuteAngle));
  pop();

  push();
  strokeWeight(1);
  var secondSize = 160;
  var secondAngle = map(second(),  0, 60,  0, TAU);
  rotate(secondAngle);
  line(0, -innerSize, 0, -secondSize);  
  pop();
  
  
  pop();
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
