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

  var innerSize = 60;

  push();
  strokeWeight(6);
  var hourSize = 120;
  var hourAngle = map(hour() % 12,  0, 12,  0, TAU);
  rotate(hourAngle);
  //line(0, -innerSize, 0, -hourSize);
  pop();

  push();
  strokeWeight(3);
  var minuteSize = 140;
  var minuteAngle = map(minute(),  0, 60,  0, TAU);
  rotate(minuteAngle);
  //line(0, -innerSize, 0, -minuteSize);
  pop();

  push();
  strokeWeight(1);
  var secondSize = 160;
  var secondAngle = map(second(),  0, 60,  0, TAU);
  rotate(secondAngle);
  //line(0, -innerSize, 0, -secondSize);
  pop();
  
  push();
  noStroke();
  fill(0);
  ellipse(0, 0, 320, 320);
  pop();
  
  push();
  var hs = hourSize;
  var ms = minuteSize;
  var ss = secondSize;
  noStroke();
  fill(255);
  beginShape();
  vertex(
    hs*sin(hourAngle),
    -hs*cos(hourAngle));
  vertex(
    ms*sin(minuteAngle),
    -ms*cos(minuteAngle));
  vertex(
    ss*sin(secondAngle),
    -ss*cos(secondAngle));
  endShape(CLOSE);
  pop();
  
  pop();

  noStroke();
  fill(0);
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
