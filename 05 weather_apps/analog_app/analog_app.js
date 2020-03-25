var plainFont;
var boldFont;
var italicFont;

var showValues = true;

var tempImage;

function preload() {
  plainFont = loadFont("data/BELL.TTF");
  boldFont = loadFont("data/BELLB.TTF");
  italicFont = loadFont("data/BELLI.TTF");
  tempImage = loadImage("data/temp.png");
  humImage = loadImage("data/humid.png");
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
  //background('#e3e1ce');
  background(255);
  
  push();
  noFill();
  stroke('#3A3839');
  strokeWeight(3);
  //circle(width/2, 160, 400);
  //circle(80, 450, 210);
  //circle(275, 560, 230);
  pop();
  
  if (w.ready) {
      
    drawDial(90, 240, 240,
      0.2*PI, 0.4*PI,
      0, 1,
      0.4, 0.7,
      w.getHumidity(), 'Humidity (%)',
      '#39acc6', true);
        
    drawDial(width-90, 240, 240,
      -0.4*PI, -0.2*PI,
      10, 90,
      40, 72,
      w.getTemperature(), 'Temp (°F)',
      '#ffe600', true);
      
    let gap = 0.04;
    drawDial(width/2, 450, 150,
      -PI/2+gap, -gap,
      0, 1,
      0, .3,
      w.getPrecipProbability(), 'Precip (%)',
      '#88cddd', true);
    drawDial(width/2, 450, 150,
      -PI+gap, -PI/2-gap,
      0, 20,
      0, 2,
      w.getPrecipIntensity(), 'Precip (in)',
      '#d7eef4', false);
    drawDial(width/2, 450, 150, 
      gap, PI/2-gap,
      2, 14,
      4, 10,
      w.getWindSpeed(), 'Wind (mph)',
      '#fff066', true);
    
    drawDial(width/2, 450, 150,
      PI/2+gap, PI-gap,
      0, 1,
      .5, .8,
      w.getCloudCover(), 'Clouds (%)',
      '#fffacc', false);
    //noLoop();
    textAlign(CENTER);
    textFont(plainFont, 24);
    text((hour()+ ':' + nf(minute(), 2)), width/2, 260);
  }

}

function drawDial(x, y, r, thetaMin, thetaMax, dataMin, dataMax, zoneMin, zoneMax, value, dataName, zoneColor, upright) {
  push();
  
  translate(x, y);
  textFont(plainFont, r*2/25);
  let r_ti = r*29/25;
  let r_li = r*22/25;
  let r_ob = r;
  let r_ib = r*24/25;
  let r_oz = r*20/25;
  let r_iz = r*5/25;
  
  push(); // min_value
  rotate(thetaMin);
  if (upright) {
    textAlign(LEFT);
    text(dataMin, 0, -r_li);
  }
  else {
    rotate(PI);
    textAlign(RIGHT);
    text(dataMin, 0, r*23/25);
  }
  pop(); // min_value
  
  push(); // max_value
  rotate(thetaMax);
  if (upright) {
    textAlign(RIGHT);
    text(dataMax, 0, -r_li);
  }
  else {
    rotate(PI);
    textAlign(LEFT);
    text(dataMax, 0, r*23/25);
  }
  pop(); // max_value
  
  push(); // arcs
  noFill();
  arc(0, 0, r_ob*2, r_ob*2, thetaMin-PI/2, thetaMax-PI/2);
  arc(0, 0, r_ib*2, r_ib*2, thetaMin-PI/2, thetaMax-PI/2);
  pop(); // arcs
  
  push(); // ticks
  for (let i = 0; i < 10; i = i+1) {
    let theta = map(i, 0, 9, thetaMin, thetaMax);
    push();
    rotate(theta);
    line(0, -r_ib, 0, -r_ob);
    pop();
  }
  pop(); // ticks
  
  push(); // title
  rotate((thetaMin+thetaMax)/2);
  textFont(italicFont, r*2.4/25);
  textAlign(CENTER);
  if (upright) {
    text(dataName, 0, -r_ti);
  }
  else {
    rotate(PI);
    text(dataName, 0, r*31/25);
  }
  pop(); // title
  
  push(); // zone
  blendMode(MULTIPLY);
  fill(zoneColor);
  beginShape();
  zoneMin = map(zoneMin, dataMin, dataMax, thetaMin, thetaMax);
  zoneMax = map(zoneMax, dataMin, dataMax, thetaMin, thetaMax);
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 0, 20, zoneMin, zoneMax);
    vertex(r_oz*cos(theta-PI/2), r_oz*sin(theta-PI/2));
  }
  for (let i = 0; i < 21; i = i+1) {
    let theta = map(i, 20, 0, zoneMin, zoneMax);
    vertex(r_iz*cos(theta-PI/2), r_iz*sin(theta-PI/2));
  }
  endShape(CLOSE);
  pop(); // zone
  
  push(); // dial_marker
  let theta = map(value, dataMin, dataMax, thetaMin, thetaMax);
  rotate(theta);
  
  push(); // dial_marker/lines
  stroke('#3A3839');
  strokeWeight(3);
  line(0, 0, 0, -r*27/25);
  line(0, r*2/25, 0, 0);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(0, r*2/25, 0, r*4/25);
  noStroke();
  fill('#3A3839');
  circle(0, 0, r*2/25);
  pop(); // dial_marker/lines
  
  if (showValues) {
    textAlign(LEFT);
    if (upright) {
      text(value, r*1/25, -r*26/25);
    }
    else {
      rotate(PI);
      text(value, r*1/25, r*27/25);
    }
  }
  pop(); // dial_marker
  
  pop(); // 
}
