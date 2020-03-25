// 23
// + added 'countryName' variable
// + countryName is shown in the draw() function
// + mousePressed() now randomly selects a country to display

var data = [];
var dataCount;
var dataMin = 0;
var dataMax = 100;

var dataTable;
var countryCode = "USA";
var countryName;

var bounds = { };


function preload() {
  dataTable = loadTable("data/LFSFFE15.csv", "header");
}


function setup() { 
  createCanvas(960, 540);
  
  bounds.left = 90;
  bounds.right = width - 90;
  bounds.top = 60;
  bounds.bottom = height - 60;

  // one data point for each year, so calculate how many years are available
  dataCount = (2012-1995) + 1;
  
  // use Country Name instead of Country Code if you like,
  // but it's easier to avoid typos w/ the 3-digit country codes
  var row = dataTable.findRow('USA', 'Country Code');
  countryName = row.get('Country Name');
  
  // set the data points based on what's in the file
  for (var i = 0; i < dataCount; i++) {
    // use "String()" to specify that the column name is text, not a number
    var columnName = String(1995 + i);
    data.push(new DataPoint(i, row.getNum(columnName)));
  }
}


function draw() {
  background(240);
  
  // put a white rectangle behind the plot
  fill(255);
  rectMode(CORNERS);
  rect(bounds.left, bounds.top, bounds.right, bounds.bottom);

  fill(0);
  textAlign(LEFT);
  text(countryName, bounds.left, bounds.top - 15);
  
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}


// jump to a random country on mouse press
function mousePressed() {
  var randomRow = floor(random(177));  // there are 177 lines of country data
  var code = dataTable.get(randomRow, 'Country Code');
  setCountryCode(code);
}


// same as what's in setup, just condensed a little
var setCountryCode = function(code) {
  var row = dataTable.findRow(code, 'Country Code');
  countryName = row.get('Country Name');
  
  // set the data points based on what's in the file
  for (var i = 0; i < dataCount; i++) {
    var columnName = String(1995 + i);
    data[i].setAmount(row.getNum(columnName));
  }  
}
