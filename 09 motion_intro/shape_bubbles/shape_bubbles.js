let d = [];
let angle = new SoftNum(3);
let radius;
let coverScale;
let numSides;

function setup() {
  angle.setTarget(PI/2);
  radius = 200;
  coverScale = 1.5;
  numSides = 6;
  createCanvas(960, 540);
  for (let i=0; i<numSides; i++) {
    d[i] = new SoftNum(2*radius);

  }
}

function draw() {
  noStroke();
  background(255);
  translate(width/2, height/2);
  angle.update();

  fill(200, 200, 0);
  beginShape();
  for (let i=0; i<numSides; i++) {
    let a = 2*PI/numSides*i + angle.value;
    let x = radius*cos(a);
    let y = radius*sin(a);
    print(angle.value);
    vertex(x, y);
  }
  endShape();

  fill(255);
  for (let i=0; i<numSides; i++) {
    d[i].update();
    let a = 2*PI/numSides*i + angle.value;
    let x = radius*cos(a);
    let y = radius*sin(a);
    ellipse(x, y, d[i].value);
  }
}

function mousePressed() {
  for (let i=0; i<numSides; i++) {
    d[i].setTarget(random(coverScale*radius));
  }
  angle.setTarget(random(2*PI));
}
