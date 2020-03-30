function RegionBlob(rgn, yr) {
  var r = rgn;
  var region = regionJSON.regions[r];
  var year = yr;

  // set these empty so they can be set the first time around
  var radius = [];
  var opacity = [];
  var noData = [];
  var regionOpacity;
  var mean;

  var center = regionPlacement[r];

  this.update = function() {
    let sum = 0;
    for (c in region.members) {
      radius[c].update();
      opacity[c].update();
      // if (region.members[c] == 'USA') {
      //   print("HEYYY " + region.members[c]);
      //   print('target is now ' + radius[c].target);
      //   print('value is now ' + radius[c].value);
      // }
      sum += radius[c].value;
    }
    mean = sum / region.members.length;

    regionOpacity.update();
    // if (region.code == "ECE") print("ropacity " + region.code + regionOpacity.value);
  }

  this.display = function() {
    push();
    noStroke();
    fill(region.color[0], region.color[1], region.color[2], regionOpacity.value);
    ellipse(center[0], center[1], 20, 20);
    if (dist(mouseX, mouseY, center[0], center[1]) < 10) {
      regionOpacity.setTarget(255);
      textAlign(LEFT);
      textSize(20);
      // text(region.code + " : " + regionOpacity.value, 10, height - 30);
      text(region.code + " : " + region.name + " : " + nf(mean, 0, 2) + unit, 10, height - 10);
    } else regionOpacity.setTarget(0);
    // translate(center[0], center[1]);
    fill(region.color[0], region.color[1], region.color[2], 128);
    beginShape();
    for (c in region.members) {
      let angle = TWO_PI / region.members.length * c;
      let x = map(radius[c].value, dataMin, dataMax, radiusMin, radiusMax) * cos(angle);
      let y = map(radius[c].value, dataMin, dataMax, radiusMin, radiusMax) * sin(angle);
      x += center[0];
      y += center[1];
      vertex(x, y);

      push();
      if (dist(mouseX, mouseY, x, y) < 5) {
        opacity[c].setTarget(255);
      } else opacity[c].setTarget(0);
      fill(region.color[0], region.color[1], region.color[2], opacity[c].value);
      textAlign(LEFT);
      textSize(20);
      // text(region.code + " : " + opacity[c].value, 10, height - 30);
      let countryName = countryTable.findRow(region.members[c], 'iso').get('name');
      if (noData[c]) {
        text(region.members[c] + " : " + countryName + " : No Data", 10, height - 10);
      } else {
        text(region.members[c] + " : " + countryName + " : " + nf(radius[c].value, 0, 2) + unit, 10, height - 10);
      }
      ellipse(x, y, 10, 10);
      stroke(region.color[0], region.color[1], region.color[2], opacity[c].value);
      line(center[0], center[1], x, y);
      pop();
    }
    endShape(CLOSE);
    pop();
  }

  this.setYear = function(yr) {
    year = yr;
    for (c in region.members) {
      let country = region.members[c];
      let row = dataTable.findRow(country, 'ISO');
      if (row.get(yr) != '') {
        let newRadius = row.getNum(yr);
        // if (country == 'USA') {
        //   print(newRadius);
        // }
        radius[c].setTarget(newRadius);
        noData[c] = false;
      } else {
        noData[c] = true;
      }
    }
  }

  for (c in region.members) {
    let country = region.members[c];
    let row = dataTable.findRow(country, 'ISO');
    let newRadius = row.getNum(yr);
    opacity[c] = new SoftNum(0);
    print(row.get(yr));
    if (row.get(yr) != '') {
      let newRadius = row.getNum(yr);
      // if (country == 'USA') {
      //   print(newRadius);
      // }
      radius[c] = new SoftNum(newRadius);
      noData[c] = false;
    } else {
      radius[c] = new SoftNum(0);
      noData[c] = true;
    }
  }
  regionOpacity = new SoftNum(0);
}
