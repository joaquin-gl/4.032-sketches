// 22
// + use loadTable() to read a .csv file from the data folder
// + removed mousePressed() since it doesn't make sense to randomize the data
// + removed keyPressed() because sorting by year doesn't make sense either

var data = [];
var dataCount;
var dataMin = 0;
var dataMax = 100;

var dataTable;
var countryCode = "USA";

var bounds = { };


// load data in this function so that we can use it immediately inside setup()
function preload() {
  // load women's labor force participation rate data
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
  
  // use gray for the dots, turn off stroke
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}
