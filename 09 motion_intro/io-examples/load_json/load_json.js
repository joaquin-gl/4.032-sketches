var dataCount;
var dataMin = 0;
var dataMax = 100;

var data;
var countryCode = "USA";

var bounds = { };


// load data in this function so that we can use it immediately inside setup()
function preload() {
  // load women's labor force participation rate data
  data = loadJSON("data/LFSFFE15.json");
}


function setup() { 
  createCanvas(960, 540);
  
  bounds.left = 90;
  bounds.right = width - 90;
  bounds.top = 60;
  bounds.bottom = height - 60;

  // one data point for each year, so calculate how many years are available
  dataCount = (2012-1995) + 1;
}


function draw() {
  background(240);
  
  // put a white rectangle behind the plot
  fill(255);
  rectMode(CORNERS);
  rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
  
  let countryData = data['USA'];
  
  // set the data points based on what's in the file
  for (let i = 0; i < dataCount; i++) {
    // use "String()" to specify that the column name is text, not a number
    let x = map(i, 0, dataCount-1, bounds.left, bounds.right);

    let yearName = String(1995 + i);
    let value = countryData[yearName];
    let y = map(value, dataMin, dataMax, bounds.bottom, bounds.top);
    
    // color the dots in gray, with no outline
    fill(96);
    noStroke();
    ellipse(x, y, 8, 8);
  }
}
