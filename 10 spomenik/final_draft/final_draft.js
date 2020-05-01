var data = [];

var spmkJSON; // load data into processing
var yugoImg; // load yugoslavia image
var spmkImgs = []; // load spomenik images
var nSpomeniks = 105; // number of spomeniks
var nRowsTitle = 7; // number of rows in photo matrix (15 columns)
var nColsStory = 3; // number of columns in sidebar matrix (15 columns)
var attrDictionary = {}; // attributes as keys with spmk index lists

var imgRatio = 536.4571428571429 / 957.9619047619047 // image ratio for spomenik pictures

var logoState = [new SoftNum(0), new SoftNum(0), new SoftNum(0), new SoftNum(0)]

var currentLayout = 'title'
var allLayouts = ['title', 'story']

// var spmkFeature;

function preload() {
  spmkJSON = loadJSON("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spomenik.json");
  yugoImg = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/export_yugoslavia.png");
  logoImg = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/logo.png")
  // spmkJSON = loadJSON("../data/spomenik.json");
  // yugoImg = loadImage("../data/export_yugoslavia.png");
  for (let i = 0; i < nSpomeniks; i++) {
    spmkImgs[i] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/" + i + ".webp");
    // spmkImgs[i] = loadImage("../data/spmk_imgs/" + i + ".webp");
  }
}

function setup() {
  var canvas = siteCanvas(z = 'bg', nav = true, scroll = 2);
  windowResized();

  for (let i = 0; i < nSpomeniks; i++) {
    data.push(new SpomenikVisual(i));
  }
}

function draw() {
  background(55);

  // set site layout targets
  siteLayout(currentLayout);

  // update logo state
  logoState[0].update();
  logoState[1].update();
  logoState[2].update();
  logoState[3].update();

  // update spomenik states
  data.forEach(function(entry) {
    entry.update();
    entry.display();
  })

  // move logo where it needs to be
  push();
  translate(logoState[0].value, logoState[1].value)
  rotate(logoState[2].value)
  imageMode(CENTER);
  image(logoImg, 0, 0, logoState[3].value, logoState[3].value * 1.7 / 13.3)
  pop();
}

function siteLayout(layout) {
  if (layout == 'title') {
    logoState[0].setTarget(width / 2)
    logoState[1].setTarget(height / 4)
    logoState[2].setTarget(0)
    logoState[3].setTarget(width / 2)
  } else if (layout == 'story') {
    logoState[0].setTarget(width - width / 8 - 20)
    logoState[1].setTarget(height - width / 8 * 1.7 / 13.3 - 20)
    logoState[2].setTarget(0)
    logoState[3].setTarget(width / 4)
  }
  data.forEach(function(entry) {
    entry.setLayout(layout)
  })
}

function mousePressed() {
  // if (currentLayout == 'title') {
  //   currentLayout = 'story'
  // } else if (currentLayout == 'story') {
  //   currentLayout = 'title'
  // };

  if (mouseInState(logoState, 1.7 / 13.3)) {
    console.log('logo was clicked!');
    currentLayout = 'title'
  } else {
    data.forEach(function(entry) {
      entry.checkClick()
    })
  }
}

function mouseInState(objectState, objectRatio) {
  return ((mouseX > objectState[0].value - objectState[3].value / 2) &&
    (mouseX < objectState[0].value + objectState[3].value / 2) &&
    (mouseY > objectState[1].value - objectState[3].value / 2 * objectRatio) &&
    (mouseY < objectState[1].value + objectState[3].value / 2 * objectRatio))
}

function windowResized() {
  siteResized();
}
