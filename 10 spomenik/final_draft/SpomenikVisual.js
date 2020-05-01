function SpomenikVisual(idx) {
  var spmk = spmkJSON.spomeniks[idx];
  var attrs = [];
  var state = [new SoftNum(0), new SoftNum(0), new SoftNum(0), new SoftNum(1)] // [x coordinate, y coordinate, rotation, image width]

  var randomTilt = random(-0.05, 0.05);

  var featured;
  var attrIndex = {};

  // store index in relevant designer keys
  for (i in spmk.designer) {
    attrs.push(spmk.designer[i]);
    if (attrDictionary[spmk.designer[i]] == null) {
      attrDictionary[spmk.designer[i]] = [idx];
      attrIndex[spmk.designer[i]] = 0;
    } else {
      attrIndex[spmk.designer[i]] = attrDictionary[spmk.designer[i]].length;
      attrDictionary[spmk.designer[i]].push(idx);
    }
    // print(spmk.designer[i] + attrDictionary[spmk.designer[i]]);
  }

  // store index in relevant material keys
  for (i in spmk.materials) {
    attrs.push(spmk.materials[i]);
    if (attrDictionary[spmk.materials[i]] == null) {
      attrDictionary[spmk.materials[i]] = [idx];
      attrIndex[spmk.materials[i]] = 0;
    } else {
      attrIndex[spmk.materials[i]] = attrDictionary[spmk.materials[i]].length;
      attrDictionary[spmk.materials[i]].push(idx);
    }
    // print(spmk.materials[i] + attr[spmk.materials[i]]);
  }

  // store index in relevant condition keys
  for (i in spmk.condition) {
    attrs.push(spmk.condition[i]);
    if (attrDictionary[spmk.condition[i]] == null) {
      attrDictionary[spmk.condition[i]] = [idx];
      attrIndex[spmk.condition[i]] = 0;
    } else {
      attrIndex[spmk.condition[i]] = attrDictionary[spmk.condition[i]].length;
      attrDictionary[spmk.condition[i]].push(idx);
    }
    // print(spmk.condition[i] + attrDictionary[spmk.condition[i]]);
  }

  this.update = function() {
    state[0].update();
    state[1].update();
    state[2].update();
    state[3].update();
  }
  this.display = function() {
    // rect(matrixState[0], matrixState[1], matrixState[2], matrixState[2]*imgRatio);
    push()
    translate(state[0].value, state[1].value)
    rotate(state[2].value)
    imageMode(CENTER);
    image(spmkImgs[idx], 0, 0, state[3].value, state[3].value * imgRatio)
    pop()
    // fill(55, 55, 55, 200);
    // noStroke();
    // rectMode(CENTER);
    // rect(state[0].value, state[1].value, state[2].value, state[2].value*imgRatio);
  }
  this.setLayout = function(layout) {
    if (layout == 'title') {
      let imgWidth = width / nRowsTitle
      state[0].setTarget(imgWidth * (idx % nRowsTitle) + imgWidth / 2)
      state[1].setTarget(imgWidth * imgRatio * floor(idx / nRowsTitle) + imgWidth * imgRatio / 2)
      state[2].setImperfectTarget(0, 0.1)
      state[3].setImperfectTarget(imgWidth, 15)
    } else if ((layout == 'story') && !featured) {
      let imgHeight = height / nSpomeniks * nColsStory;
      state[0].setTarget(imgHeight / imgRatio * (idx % nColsStory) + imgHeight / imgRatio / 2);
      state[1].setTarget(imgHeight * floor(idx / nColsStory) + imgHeight / 2);
      state[2].setTarget(0)
      state[3].setTarget(imgHeight / imgRatio)
    } else if ((layout == 'story') && featured) {
      let sbWidth = height / nSpomeniks * nColsStory * nColsStory / imgRatio;
      // let imgWidth = width - 2 * sbWidth;
      let imgWidth = 5 / 8 * width;
      state[0].setTarget((width - sbWidth) / 2 + sbWidth)
      state[1].setTarget(2 / 3 * imgWidth * imgRatio)
      state[2].setTarget(randomTilt)
      state[3].setTarget(imgWidth);
    }
  }
  this.checkClick = function() {
    if (mouseInState(state, imgRatio)) {
      console.log(spmk.title + ' was clicked!');
      currentLayout = 'story';
      featured = true;
    } else {
      featured = false;
    }
  }
}
