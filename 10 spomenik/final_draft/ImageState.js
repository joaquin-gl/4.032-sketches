function ImageState(imageInit, xInit, yInit, rInit, wInit) {
  this.img = imageInit;
  this.x = new SoftNum(xInit);
  this.y = new SoftNum(yInit);
  this.r = new SoftNum(rInit);
  this.w = new SoftNum(wInit);
  this.ratio = this.img.height / this.img.width;
  this.active = false;

  this.update = function() {
    this.x.update();
    this.y.update();
    this.r.update();
    this.w.update();
    this.active = ((mouseX > this.x.value - this.w.value / 2) &&
                  (mouseX < this.x.value + this.w.value / 2) &&
                  (mouseY > this.y.value - this.w.value / 2 * this.ratio) &&
                  (mouseY < this.y.value + this.w.value / 2 * this.ratio));
  }

  this.display = function() {
    push();
    translate(this.x.value, this.y.value);
    rotate(this.r.value);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w.value, this.w.value * this.ratio);
    pop();
  }

  this.displayDot = function() {
    push();
    fill(255);
    translate(this.x.value, this.y.value);
    rotate(this.r.value);
    circle(0, 0, 20);
    pop();
  }

  this.setTarget = function(xNew, yNew, rNew, wNew) {
    if (xNew != null) {this.x.setTarget(xNew)};
    if (yNew != null) {this.y.setTarget(yNew)};
    if (rNew != null) {this.r.setTarget(rNew)};
    if (wNew != null) {this.w.setTarget(wNew)};
  }

  this.scaleByLongest = function(longestSide) {
    let wNew;
    let hNew;
    if (this.ratio < 1) { // if ratio is less than one (width > height)
      wNew = longestSide;
      hNew = longestSide * this.ratio;
    } else {
      wNew = longestSide / this.ratio;
      hNew = longestSide;
    }
    this.setTarget(null, null, null, wNew);
  }
}
