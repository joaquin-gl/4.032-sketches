var data = [];

var spmkJSON; // load data into processing
var yugoImg; // load yugoslavia image
var spmkImgs = []; // load spomenik images

var rmap = {}; // bounds for map loading
var sb = {}; // bounds for sidebar loading

var spmkFeature; // spomenik to feature

var attr = {}; // dictionary for storing spmk indices matching attributes

var attrFeature = ''; // attribute to feature

var n = 105; // number to show

function preload() {
  spmkJSON = loadJSON("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/spomenik_viz/data/spomenik.json");
  yugoImg = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/spomenik_viz/data/export_yugoslavia.png");
  for (let i = 0; i < n; i++) {
    spmkImgs[i] = loadImage("https://raw.githubusercontent.com/joaquin-gl/4.032-sketches/master/10%20spomenik/spomenik_viz/data/spmk_imgs/" + i + ".webp");
  }
}

function setup() {
  var canvas = siteCanvas();
  windowResized();

  // print('num of spomeniks: ' + spmkJSON.spomeniks.length);

  for (let i = 0; i < n; i++) {
    data.push(new DataPoint(i));
  }

  // check all attribute names to output file
  // let writer = createWriter('output.txt');
  // Object.keys(attr).forEach(function(key) {
  //   writer.write(key +'\n');
  // });
  // writer.close();
}

function draw() {
  background(240);
  noStroke();

  // outline the different regions
  // push();
  // noFill();
  // stroke(100);
  // rect(rmap.left, rmap.top, rmap.width, rmap.height)
  // rect(sb.left, sb.top, sb.width, sb.height)
  // pop();

  // plot yugoslavia
  image(yugoImg, rmap.left, rmap.top, rmap.width, rmap.height);

  // write attribute featured
  fill(186, 86, 36);
  textSize(36);
  text(attrFeature, rmap.left, rmap.bottom);

  // update, display each spomenik
  data.forEach(function(entry) {
    entry.update();
    entry.display();
  })
}

function mousePressed() {
  attrFeature = '';
}

function windowResized() {
  siteResized();

  let margin = width / 14;

  rmap.left = margin;
  rmap.top = margin / 3 * 2;
  rmap.width = width / 2 - margin;
  rmap.height = rmap.width * yugoImg.height / yugoImg.width;
  rmap.right = rmap.left + rmap.width;
  rmap.bottom = rmap.top + rmap.height;

  rmap.latitude = [40.7, 47];
  rmap.longitude = [13.2, 23.3];

  sb.right = width - margin;
  sb.top = margin / 3 * 2;
  sb.width = width / 2 - 2 * margin;
  sb.height = height - 2 * margin;
  sb.left = sb.right - sb.width;
  sb.bottom = sb.top + sb.height;
}
