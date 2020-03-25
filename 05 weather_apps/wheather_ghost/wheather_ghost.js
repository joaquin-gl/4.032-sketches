// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0
var tOff = 0;
var prevSecond;
var randPushx = [];
var prevRandPushx = [];
var randPushy = [];
var prevRandPushy = [];

function setup() {
  createCanvas(375, 638);
  
  // get the current weather for MIT's latitude and longitude
  w = requestWeather(42.3596764, -71.0958358);

  // un-comment any of these lines (and comment-out the line above)
  // to try your weather app with another location/another time of day
  //w = requestWeather('data/mit-tuesday.json');
  //w = requestWeather('data/mit-wednesday.json');
  //w = requestWeather('data/alcatraz.json');
  //w = requestWeather('data/cambridge.json');
  //w = requestWeather('data/indianapolis.json');
  //w = requestWeather('data/medfield.json');
  textAlign(CENTER, CENTER);
  strokeCap(ROUND);
  //frameRate(1);
  prevSecond = second()-1;
  for (let i = 0; i < 24; i = i+1) {
    prevRandPushx[i] = 0;
    prevRandPushy[i] = 0;
  }
  
}


function draw() {
   
  if (second() != prevSecond) {
    tOff = millis()%1000;
  }
  
  background(255);
  push(); // draw
  translate(width/2, height/2);
  noStroke();
  fill(0);
  text(hoursMinutesSeconds(), width/2, height-10);
  noFill();
  stroke(0);
  
  if (w.ready) {

  var hourAngle = map(hour() % 12,  0, 12,  0, TAU);
  var minuteAngle = map(minute(),  0, 60,  0, TAU);
  var secondAngle = map(smoothSecond(),  0, 60,  0, TAU);
  
  var iMax = map(w.getCloudCover(), 0, 1, 3, 24);
  var rWind = map(w.getWindSpeed(), 0, 14, 0, 5);
  
  for (let i = 0; i < iMax; i = i+1) {
    
    randPushx[i] = prevRandPushx[i] + random(-rWind, rWind);
    randPushy[i] = prevRandPushy[i] + random(-rWind, rWind);
    push(); // shape
    
    var offset = -20;
    
    colorMode(HSB, 360, 100, 100);
    var hTemp = map(w.getTemperature(), 10, 90, 200, 360);
    var sIter = map(i, 0, iMax-1, 0, 100);
    
    var hs = map(i, 0, iMax, -80, 80);
    var ms = map(i, 0, iMax, -120, 120);
    var ss = map(i, 0, iMax, -180, 180);
    
    strokeWeight(3);
    stroke(hTemp, sIter, 100);
    smooth();
    beginShape();
    translate(randPushx[i], randPushy[i]);
    curveVertex(
      hs*sin(hourAngle),
      -hs*cos(hourAngle));
    curveVertex(
      hs*sin(hourAngle),
      -hs*cos(hourAngle));
    curveVertex(
      ms*sin(minuteAngle),
      -ms*cos(minuteAngle));
    curveVertex(
      ss*sin(secondAngle),
      -ss*cos(secondAngle));
    curveVertex(
      hs*sin(hourAngle),
      -hs*cos(hourAngle));
    curveVertex(
      ms*sin(minuteAngle),
      -ms*cos(minuteAngle));
    endShape();
    pop(); // shape
    prevRandPushx[i] = randPushx[i];
    prevRandPushy[i] = randPushy[i];
  }
  }
  
  pop(); // draw

  noStroke();
  fill(0);
  //text(hoursMinutesSeconds(), width/2, height-10);
  prevSecond = second();
}

function smoothSecond() {
  var s = second() + ((millis()-tOff) % 1000)/1000;
  return s;
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

function hoursMinutesSecondsMillis() {
  return hoursMinutesSeconds() + ':' + ((millis()-tOff) % 1000)/1000;
}
