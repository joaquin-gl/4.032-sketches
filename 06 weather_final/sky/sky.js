// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0
var tOff = 0;
var prevSecond;
var windOff = 0.0;
var pushOrigin = 0.0;

var debug = false;

// notes:
// what do you see when youre looking at the sky
// background solid color or gradient with temp
// clouds have fill with intersecting blending
// noise() instead of random gives better movement

function preload() {
  img = loadImage('data/ciel.png');
}

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
  prevSecond = second()-1;
}

function draw() {
   
  if (second() != prevSecond) {
    tOff = millis()%1000;
  }
  
  // Image Background
  var hourFloat = hour() + minute()/60 + second()/360 + ((millis()-tOff) % 1000)/360000;
  //hourFloat = 12;
  //hourFloat = 0;
  //hourFloat = 18;
  var hourOffset = -9;
  var imagePush = map(hourFloat+hourOffset, 0, 24, 0, 15517);
  image(img, 0, -15517-imagePush);
  image(img, 0, -imagePush);
  
  push(); // draw
  translate(width/2, height/2);
  
  if (w.ready) {

  var hourAngle = map(hour() % 12,  0, 12,  0, TAU);
  var minuteAngle = map(minute(),  0, 60,  0, TAU);
  var secondAngle = map(smoothSecond(),  0, 60,  0, TAU);
  
  var cloudCount = map(w.getCloudCover(), 0, 1, 5, 200);
  //cloudCount = 5;
  //cloudCount = 200;
  
  windOff = windOff + map(w.getWindSpeed(), 0, 14, 0.00001, 0.005);
  //windOff = windOff + 0.00001;
  //windOff = windOff + 0.005;
  
  var shadeOffset = map(w.getPrecipProbability(), 0, 1, 0, 30);
  //shadeOffset = 0;
  //shadeOffset = 30;
  
  for (let i = 0; i < cloudCount; i = i+1) {
    
    push(); // shape
    
    // positions
    let xNoise = noise(windOff, 0+2*i) * width - width/2;
    let yNoise = noise(windOff, 1+2*i) * height - height/2;
    pushOrigin = (1 + sin(millis()/(1000*5)))/300;
    let x = xNoise*pushOrigin*width/2;
    let y = yNoise*pushOrigin*height/2;
    translate(x, y);
    
    // colors
    //blendMode(ADD);
    colorMode(HSB, 360, 100, 100, 100);
    var cloudShade = map(i, 0, cloudCount-1, 90-1.5*shadeOffset, 100-shadeOffset);
    noStroke();
    fill(0, 0, cloudShade, 30);
    
    // shape
    var hs = map(i, 0, cloudCount, -80, 80);
    var ms = map(i, 0, cloudCount, -120, 120);
    var ss = map(i, 0, cloudCount, -180, 180);
    beginShape();
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
    pop(); // shape\
  }
  }
  
  pop(); // draw

  noStroke();
  if (debug) {
    fill(255);
    text(hoursMinutesSeconds(), width/2, height-10);
  }
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

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == 1) {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      let inter = map(i, y, y+h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == 0) {  // Left to right gradient
    for (let i = x; i <= x+w; i++) {
      let inter = map(i, x, x+w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
