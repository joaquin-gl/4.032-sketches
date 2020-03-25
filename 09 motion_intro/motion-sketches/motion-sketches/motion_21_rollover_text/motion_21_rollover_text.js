// 21
// + this adds code to the end of the display() function to detect
//   when the mouse is near a point and draw the data value


var data = [];
var dataCount = 20;
var dataMin = 0;
var dataMax = 100;

var bounds = { };


function setup() { 
  createCanvas(960, 540);
  
  bounds.left = 90;
  bounds.right = width - 90;
  bounds.top = 60;
  bounds.bottom = height - 60;

  for (var i = 0; i < dataCount; i++) {
    data.push(new DataPoint(i, random(dataMin, dataMax)));
  }
}


function draw() { 
  background(240);
  
  // put a white rectangle behind the plot
  fill(255);
  rectMode(CORNERS);
  rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
  
  // use gray for the dots, turn off stroke
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}


// set new data when the mouse is pressed
function mousePressed() {
  // sets each entry in the array to a random number
  data.forEach(function(entry) {
    entry.setAmount(random(dataMin, dataMax));
  });
}


function keyPressed() {
  // sort each element in the array by comparing their difference
  data.sort(function(a, b) {
    return a.getAmount() - b.getAmount();
  });
  for (var i = 0; i < data.length; i++) {
    data[i].setIndex(i);
  }
}
