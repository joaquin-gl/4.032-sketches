function SpomenikVisual(idx) {
  var spmk = spmkJSON.spomeniks[idx];
  var attrs = [];
  var state = [new SoftNum(0), new SoftNum(0), new SoftNum(0), new SoftNum(1)] // [x coordinate, y coordinate, rotation, image width]

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
  for (i in spmk.materials){
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
  for (i in spmk.condition){
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
    image(spmkImgs[idx], 0, 0, state[3].value, state[3].value*imgRatio)
    pop()
    // fill(55, 55, 55, 200);
    // noStroke();
    // rectMode(CENTER);
    // rect(state[0].value, state[1].value, state[2].value, state[2].value*imgRatio);
  }
  this.setLayout = function(layout) {
    if (layout == 'title') {
      state[0].setTarget(width/nRowsTitle*(idx%nRowsTitle) + width/nRowsTitle/2)
      state[1].setTarget(width/nRowsTitle*imgRatio*floor(idx/nRowsTitle) + width/nRowsTitle*imgRatio/2)
      state[2].setImperfectTarget(0, 0.1)
      state[3].setImperfectTarget(width/nRowsTitle, 15)
    }
    else if (layout == 'story') {
      state[0].setTarget(height/nSpomeniks*nColsStory/imgRatio*(idx%nColsStory) + height/nSpomeniks*nColsStory/imgRatio/2);
      state[1].setTarget(height/nSpomeniks*nColsStory*floor(idx/nColsStory) + height/nSpomeniks*nColsStory/2);
      state[2].setTarget(0)
      state[3].setTarget(height/nSpomeniks*nColsStory/imgRatio)
    }
  }
}
