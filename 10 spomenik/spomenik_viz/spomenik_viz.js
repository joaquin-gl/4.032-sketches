var data = [];

var spmkJSON; // load data into processing
var yugoImg; // load yugoslavia image
var spmkImgs = []; // load spomenik images

var map = {}; // bounds for map loading
var sb = {}; // bounds for sidebar loading

var spmkFeature; // spomenik to feature

var attr = {}; // dictionary for storing spmk indices matching attributes

var attrFeature; // attribute to feature

var n = 105; // number to show

function preload() {
  spmkJSON = loadJSON("data/spomenik.json");
  yugoImg = loadImage("data/export_yugoslavia.png");

  // for (let i=0; i<spmkJSON.spomeniks.length; i++) {
  for (let i=0; i<n; i++) {
    spmkImgs[i] = loadImage("data/spmk_imgs/" + i + ".webp");
  }
}

function setup() {
  // createCanvas(960, 960);
  // createCanvas(1366, 768);
  createCanvas(windowWidth, windowHeight);

  print('num of spomeniks: ' + spmkJSON.spomeniks.length);

  let margin = width/14;

  map.left = margin;
  map.top = margin/3*2;
  map.width = width/2 - margin;
  map.height = map.width * yugoImg.height / yugoImg.width;
  map.right = map.left + map.width;
  map.bottom = map.top + map.height;

  map.latitude = [40.7, 47];
  map.longitude = [13.2, 23.3];

  sb.right = width - margin;
  sb.top = margin/3*2;
  sb.width = width/2 - 2*margin;
  sb.height = height - 2*margin;
  sb.left = sb.right - sb.width;
  sb.bottom = sb.top + sb.height;

  // for (let i=0; i<spmkJSON.spomeniks.length; i++) {
  // for (let i=0; i<17; i++) {
  //   var spomenik = spmkJSON.spomeniks[idx];
  //
  //   for (designer in spomenik.designer) {
  //     attr[designer].push(i);
  //     print(attr[designer]);
  //   }
  //   for (material in spomenik.materials){
  //     attr[material].push(i);
  //   }
  // }
  // for (let i=0; i<spmkJSON.spomeniks.length; i++) {
  for (let i=0; i<n; i++) {
    data.push(new DataPoint(i));
  }
}

function draw() {
  background(240);
  noStroke();

  // push();
  // noFill();
  // stroke(100);
  // rect(map.left, map.top, map.width, map.height)
  // rect(sb.left, sb.top, sb.width, sb.height)
  // pop();

  // plot yugoslavia
  image(yugoImg, map.left, map.top, map.width, map.height);

  // write attribute featured
  fill(186, 86, 36);
  textSize(36);
  text(attrFeature, map.left, map.bottom);

  data.forEach(function(entry){
    entry.update();
    entry.display();
  })
}

function mousePressed() {
  attrFeature = '';
}
