// 23

var dataCode = "AMFAMDHS";
var dataCode = "LFSFFE15";

var data = [];
var dataMin;
var dataMax;
var radiusMin = 20;
var radiusMax = 150;

var dataTable;
var indicatorTable;
var countryTable;
var regionJSON;
var regionPlacement;

var years = [];
var iYear = 0;

var unit;

function preload() {
  dataTable = loadTable("data/" + dataCode + ".csv", "header");
  indicatorTable = loadTable("data/indicators.csv", "header");
  countryTable = loadTable("data/countries.csv", "header");
  regionJSON = loadJSON("data/regions.json");
}


function setup() {
  createCanvas(960, 540);

  regionPlacement = [
    [1/5*width, 1/3*height],
    [2/5*width, 1/3*height],
    [3/5*width, 1/3*height],
    [4/5*width, 1/3*height],
    [1.5/5*width, 2/3*height],
    [2.5/5*width, 2/3*height],
    [3.5/5*width, 2/3*height]
  ];

  for (let i = 1; i < dataTable.getColumnCount(); i++) {
    years[i-1] = dataTable.columns[i];
    print("years: " + years);
  }

  var irow = indicatorTable.findRow(dataCode, 'series');
  dataName = irow.get('name');
  unit = irow.get('unit');

  // loop over each region to find which countries are not in the dataset
  dataMin = dataTable.getNum(0, 1);
  dataMax = dataMin;

  for (let r = 0; r < dataTable.getRowCount(); r++) {
    if (dataTable.getString(r, 0)[0] == "#") continue;
    for (let c = 1; c < dataTable.getColumnCount(); c++) {
      if (dataTable.get(r, c) == '') continue;
      print(r + "-------" + dataTable.getNum(r, c));
      if (dataTable.getNum(r, c) < dataMin) dataMin = dataTable.getNum(r, c);
      if (dataTable.getNum(r, c) > dataMax) dataMax = dataTable.getNum(r, c);
    }
  }
  print("dataMin = " + dataMin);
  print("dataMax = " + dataMax);

  for (let r in regionJSON.regions) {
    region = regionJSON.regions[r]
    // print("REGION: " + region.name);
    for (let c = 0; c < region.members.length; c++) {
      if (dataTable.findRow(region.members[c], 'ISO') != null) {
        print(region.members[c] + " in " + region.code);
      } else {
        // print(region.members[c] + " not in dataset");
        // print("remove " + region.members[c]);
        region.members.splice(c, 1);
        // print("now " + region.members.length);
        c--;
      }
    }
    // print("NEW LIST " + region.name);
    for (let c = 0; c < region.members.length; c++) {
      // print("  " + region.members[c]);
    }
  }

  // set the data points based on what's in the file
  for (let r in regionJSON.regions) {
    print("new blob: " + r + ", " + years[iYear]);
    data.push(new RegionBlob(r, years[iYear]));
  }

}


function draw() {
  background(255);

  fill(107, 112, 93);
  textAlign(LEFT);
  textSize(20);
  text(dataName, 10, 25);
  textSize(54);
  text(years[iYear], 10, 75);

  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
}


// jump to a random year on mouse press
function mousePressed() {
  iYear++;
  if (iYear == years.length) iYear = 0;
  print("click! : " + years[iYear]);
  data.forEach(function(entry) {
    entry.setYear(years[iYear]);
  });
}
