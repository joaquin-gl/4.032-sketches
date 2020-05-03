var data = [];

var spmkJSON; // load data into processing
var bookAntiqua; // load font to use for titles, etc
var yugoImg; // load yugoslavia image
var spmkImgs = []; // load spomenik images
var storyImgs = {}; // load spomenik images

var nSpomeniks = 105; // number of spomeniks
var nRowsTitle = 7; // number of rows in photo matrix (15 columns)
var nColsStory = 3; // number of columns in sidebar matrix (15 columns)

var storyDict = [];
storyDict[41] = ['construction', 'soldiers', 'former_site', 'comparison'];

var logoState;

var currentLayout = 'title'

var featuredSpmk;

function preload() {
  spmkJSON = loadJSON("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spomenik.json");
  logoImg = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/logo.png")
  bookAntiqua = loadFont("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/fonts/BKANT.TTF")
  // spmkJSON = loadJSON("spomenik.json");
  // yugoImg = loadImage("../data/export_yugoslavia.png");
  // storyImgs[0] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/41/construction.webp")
  // storyImgs[1] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/41/soldiers.webp")
  // storyImgs[2] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/41/former_site.webp")
  // storyImgs[3] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/41/comparison.webp")
  for (let i = 0; i < nSpomeniks; i++) {
    spmkImgs[i] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/" + i + ".webp");
    for (s in storyDict[i]) {
      storyImgs[i.toString() + '/' + storyDict[i][s]] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/data/spmk_imgs/" + i + "/" + storyDict[i][s] + ".webp")
      console.log(storyDict[i][s]);
    }
  }
}

function setup() {
  var canvas = siteCanvas(z = 'bg', nav = true, scroll = 2);
  windowResized();

  logoState = new ImageState(logoImg, 0, 0, 0, 0);
  for (let i = 0; i < nSpomeniks; i++) {
    data.push(new SpomenikVisual(i));
  }
}

function draw() {
  background(55);

  // set site layout targets
  siteLayout(currentLayout);

  // update spomenik states
  data.forEach(function(entry) {
    entry.update();
    entry.display();
  })

  logoState.update();
  logoState.display();
}

function siteLayout(layout) {
  if (layout == 'title') {
    logoState.setTarget(width / 2, height / 4, null, width / 2)
  } else if (layout == 'story') {
    logoState.setTarget(width - width / 8 - 20, height - width / 8 * 1.7 / 13.3 - 20, null, width / 4)
  }
  data.forEach(function(entry) {
    entry.setLayout(layout)
  })
}

function mousePressed() {
  if (logoState.active) {
    console.log('logo was clicked!');
    currentLayout = 'title'
  } else {
    data.forEach(function(entry) {
      entry.checkClick()
    })
  }
}

function windowResized() {
  siteResized();
}
