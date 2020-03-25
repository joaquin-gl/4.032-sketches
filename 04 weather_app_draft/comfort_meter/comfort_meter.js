var plainFont;
var boldFont;
var italicFont;

var showValues = true;

function preload() {
  plainFont = loadFont("data/BELL.TTF");
  boldFont = loadFont("data/BELLB.TTF");
  italicFont = loadFont("data/BELLI.TTF");
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
}


function draw() {
  background('#CFCAAA');
  
  push();
  noFill();
  stroke('#3A3839');
  strokeWeight(3);
  circle(width/2, 160, 400);
  circle(80, 450, 210);
  circle(275, 560, 230);
  pop();
  
  if (w.ready) {
    
    dial(275, 240, 
      -0.4*PI, -0.2*PI,
      -2, 98,
      40, 72,
      w.getTemperature(), 'Temperature',
      '#FFF275', '°F');
      
    dial(100, 240, 
      0.2*PI, 0.4*PI,
      0.3, 0.7,
      0.5, 0.6,
      w.getHumidity(), 'Humidity',
      '#46B1C9', '%RH');
    
    push();
    translate(-120, 50);
    dialSmall(150, 420, 
      0.4*PI, 0.6*PI,
      0, 1,
      0, 0.2,
      w.getPrecipProbability(), '%',
      '#46B1C9', '%');
    
    dialSmall(180, 450, 
      0, 0.2*PI,
      0, 20,
      0, 5,
      w.getPrecipIntensity(), 'Precipitation',
      '#46B1C9', 'in');
    pop();
    
    push();
    translate(60, 0);
    dialSmall(195, 600, 
      0.1*PI, 0.3*PI,
      0, 12,
      0, 4,
      w.getWindSpeed(), 'Wind Speed',
      '#FFF275', '%');
    
    dialSmall(255, 580, 
      -0.5*PI, -0.3*PI,
      0, 1,
      0.2, 0.6,
      w.getCloudCover(), 'Cloud Cover',
      '#FFF275', 'in');
    pop();
    noLoop();
  }

}

function dial(x, y, thetaMin, thetaMax, dataMin, dataMax, zoneMin, zoneMax, value, dataName, zoneColor, unit) {
  push();
  
  translate(x, y);
  textFont(plainFont, 18);
  let outerSize = 250;
  let innerSize = 240;
  let outerZone = 190;
  let innerZone = 50;
  
  push(); // min value
  rotate(thetaMin);
  line(0, -innerSize, 0, -outerSize);
  textAlign(LEFT);
  text(dataMin, 0, -outerSize-10);
  pop();
  
  push(); // max value
  rotate(thetaMax);
  line(0, -innerSize, 0, -outerSize);
  textAlign(RIGHT);
  text(dataMax, 0, -outerSize-10);
  pop();
  
  push(); // arcs
  noFill();
  arc(0, 0, outerSize*2, outerSize*2, thetaMin-PI/2, thetaMax-PI/2);
  arc(0, 0, innerSize*2, innerSize*2, thetaMin-PI/2, thetaMax-PI/2);
  pop();
  
  push(); // ticks
  for (let i = 0; i < 10; i = i+1) {
  }
  pop();
  
  push(); // title
  rotate((thetaMin+thetaMax)/2);
  textFont(italicFont, 24);
  textAlign(CENTER);
  text(dataName, 0, -outerSize-30);
  pop();
  
  push(); // zone
  blendMode(MULTIPLY);
  fill(zoneColor);
  beginShape();
  zoneMin = map(zoneMin, dataMin, dataMax, thetaMin, thetaMax);
  zoneMax = map(zoneMax, dataMin, dataMax, thetaMin, thetaMax);
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 0, 20, zoneMin, zoneMax);
    vertex(outerZone*cos(theta-PI/2), outerZone*sin(theta-PI/2));
  }
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 20, 0, zoneMin, zoneMax);
    vertex(innerZone*cos(theta-PI/2), innerZone*sin(theta-PI/2));
  }
  endShape(CLOSE);
  pop();
  
  push(); // dial
  let theta = map(value, dataMin, dataMax, thetaMin, thetaMax);
  rotate(theta);
  
  var shadowLength = 5;
  push();
  translate(shadowLength*cos(-theta+PI/2), shadowLength*sin(-theta+PI/2));
  stroke('#7F7748');
  strokeWeight(3);
  line(0, 20, 0, -outerSize-20);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(0, 20, 0, 40);
  noStroke();
  fill('#7F7748');
  circle(0, 0, 20);
  pop();
  
  push();
  stroke('#3A3839');
  strokeWeight(3);
  line(0, 20, 0, -outerSize-20);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(0, 20, 0, 40);
  noStroke();
  fill('#3A3839');
  circle(0, 0, 20);
  pop();
  
  if (showValues) {
    text(value, 10, 60);
  }
  pop();  
  
  pop();
}

function dialSmall(x, y, thetaMin, thetaMax, dataMin, dataMax, zoneMin, zoneMax, value, dataName, zoneColor, unit) {
  push();
  
  translate(x, y);
  textFont(plainFont, 12);
  let outerSize = 100;
  let innerSize = 95;
  let outerZone = 70;
  let innerZone = 20;
  
  push(); // min value
  rotate(thetaMin);
  line(0, -innerSize, 0, -outerSize);
  textAlign(LEFT);
  text(dataMin, 0, -outerSize-10);
  pop();
  
  push(); // max value
  rotate(thetaMax);
  line(0, -innerSize, 0, -outerSize);
  textAlign(RIGHT);
  text(dataMax, 0, -outerSize-10);
  pop();
  
  push(); // arcs
  noFill();
  arc(0, 0, outerSize*2, outerSize*2, thetaMin-PI/2, thetaMax-PI/2);
  arc(0, 0, innerSize*2, innerSize*2, thetaMin-PI/2, thetaMax-PI/2);
  pop();
  
  push(); // ticks
  for (let i = 0; i < 10; i = i+1) {
  }
  pop();
  
  push(); // title
  rotate((thetaMin+thetaMax)/2);
  textFont(italicFont, 18);
  textAlign(CENTER);
  text(dataName, 0, -outerSize-30);
  pop();
  
  push(); // zone
  blendMode(MULTIPLY);
  fill(zoneColor);
  beginShape();
  zoneMin = map(zoneMin, dataMin, dataMax, thetaMin, thetaMax);
  zoneMax = map(zoneMax, dataMin, dataMax, thetaMin, thetaMax);
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 0, 20, zoneMin, zoneMax);
    vertex(outerZone*cos(theta-PI/2), outerZone*sin(theta-PI/2));
  }
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 20, 0, zoneMin, zoneMax);
    vertex(innerZone*cos(theta-PI/2), innerZone*sin(theta-PI/2));
  }
  endShape(CLOSE);
  pop();
  
  push(); // dial
  let theta = map(value, dataMin, dataMax, thetaMin, thetaMax);
  rotate(theta);
  
  var shadowLength = 2.5;
  push();
  translate(shadowLength*cos(-theta+PI/2), shadowLength*sin(-theta+PI/2));
  stroke('#7F7748');
  strokeWeight(1.5);
  line(0, 20, 0, -outerSize-20);
  strokeWeight(5);
  strokeCap(SQUARE);
  line(0, 10, 0, 20);
  noStroke();
  fill('#7F7748');
  circle(0, 0, 10);
  pop();
  
  push();
  stroke('#3A3839');
  strokeWeight(1.5);
  line(0, 20, 0, -outerSize-20);
  strokeWeight(5);
  strokeCap(SQUARE);
  line(0, 10, 0, 20);
  noStroke();
  fill('#3A3839');
  circle(0, 0, 10);
  pop();
  
  if (showValues) {
    text(value, 5, 30);
  }
  pop();  
  
  pop();
}
