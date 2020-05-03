function SpomenikVisual(idx) {
  var spmk = spmkJSON.spomeniks[idx];
  // var attrs = [];
  var mainImg = new ImageState(spmkImgs[idx], 0, 0, 0, 1)
  var textOpacity = new SoftNum(0);

  var featuredStory;
  var storyTextOpacity = [];
  var storySpacer;

  var storyState = [];
  for (i in spmk.stories) {
    // console.log(idx + " " + spmk.title + " : " + spmk.stories[i].pic);
    storyState[i] = new ImageState(storyImgs[idx.toString() + "/" + spmk.stories[i].pic], 0, 0, 0);
    storyTextOpacity[i] = new SoftNum(0);
  }

  this.update = function() {
    mainImg.update();
    textOpacity.update();
    for (i in spmk.stories) {
      storyState[i].update();
      storyTextOpacity[i].update();
    }
  }

  this.display = function() {
    mainImg.display();

    push();
    textFont(bookAntiqua);
    translate(mainImg.x.value - mainImg.w.value / 2,
      mainImg.y.value + 2 / 3 * mainImg.w.value * mainImg.ratio);
    fill(255, 255, 255, textOpacity.value);
    textSize(72);
    text(spmk.title, 0, 0);
    pop();

    if (featuredSpmk == idx) {
      for (i in spmk.stories) {
        storyState[i].display();
        push();
        textFont(bookAntiqua);
        circle(storyState[i].x.value + storyState[i].w.value / 2,
          storyState[i].y.value - storyState[i].w.value * storyState.ratio / 2, 10)
        fill(255, 0, 0, storyTextOpacity[i].value);
        textSize(22);
        // rectMode(CENTER);
        text(spmk.stories[i].text,
          storyState[i].x.value + storyState[i].w.value / 2 + storySpacer,
          storyState[i].y.value - storyState[i].w.value * storyState[i].ratio / 2,
          mainImg.w.value - storyState[i].w.value - storySpacer,
          storyState[i].w.value * storyState.ratio);
        pop();
      }
    } else {
      featuredStory = null;
      for (i in spmk.stories) {
        push();
        noStroke();
        fill(255, 255, 255, 50);
        circle(mainImg.x.value - mainImg.w.value/2, mainImg.y.value - mainImg.w.value*mainImg.ratio/2, 10);
        pop();
      }
    }
  }

  this.setLayout = function(layout) {
    if (layout == 'title') {
      let imgWidth = width / nRowsTitle
      mainImg.setTarget(imgWidth * (idx % nRowsTitle) + imgWidth / 2,
        imgWidth * mainImg.ratio * floor(idx / nRowsTitle) + imgWidth * mainImg.ratio / 2,
        null, null);
      mainImg.r.setImperfectTarget(0, 0.2)
      mainImg.w.setImperfectTarget(imgWidth, 15)
      textOpacity.setTarget(0);
      for (i in spmk.stories) {
        storyState[i].setTarget(mainImg.x.target, mainImg.y.target, mainImg.r.target, mainImg.w.target);
      }
    } else if ((layout == 'story') && (featuredSpmk != idx)) {
      let imgHeight = height / nSpomeniks * nColsStory;
      mainImg.setTarget(imgHeight / mainImg.ratio * (idx % nColsStory) + imgHeight / mainImg.ratio / 2,
        imgHeight * floor(idx / nColsStory) + imgHeight / 2,
        0,
        imgHeight / mainImg.ratio);
      textOpacity.setTarget(0);
      for (i in spmk.stories) {
        storyState[i].setTarget(mainImg.x.target, mainImg.y.target, mainImg.r.target, mainImg.w.target);
      }
    } else if ((layout == 'story') && (featuredSpmk == idx)) {
      let sbWidth = height / nSpomeniks * nColsStory * nColsStory / mainImg.ratio;
      let imgWidth = 5 / 8 * width;
      mainImg.setTarget((width - sbWidth) / 2 + sbWidth,
        2 / 3 * imgWidth * mainImg.ratio,
        0,
        imgWidth);
      textOpacity.setTarget(255);
      storySpacer = mainImg.w.value / 10;
      for (i in spmk.stories) {
        if (featuredStory == i) {
          storyTextOpacity[i].setTarget(255);
          storyState[i].setTarget(mainImg.x.value - mainImg.w.value / 4 - storySpacer / 2,
            mainImg.y.value + 4 / 3 * mainImg.w.value * mainImg.ratio + storyState[i].w.value * storyState[i].ratio / 2,
            0,
            mainImg.w.value / 2 - storySpacer);
        } else {
          storyTextOpacity[i].setTarget(0);
          storyState[i].x.setTarget(mainImg.x.value - mainImg.w.value / 2 + i * mainImg.w.value / spmk.stories.length + mainImg.w.value / spmk.stories.length / 2);
          storyState[i].y.setTarget(mainImg.y.value + mainImg.w.value * mainImg.ratio);
          storyState[i].r.setImperfectTarget(0, 0.2)
          storyState[i].w.setImperfectTarget(mainImg.w.value / spmk.stories.length, 15)
        }
      }
    }
  }

  this.checkClick = function() {
    if (featuredSpmk == idx) {
      for (i in spmk.stories) {
        if (storyState[i].active) {
          console.log(spmk.stories[i].pic + ' was clicked!');
          console.log(spmk.stories[i].text);
          featuredStory = i;
        }
      }
    } else if (mainImg.active) {
      console.log(spmk.title + ' was clicked!');
      currentLayout = 'story';
      featuredSpmk = idx;
    }
  }
}
