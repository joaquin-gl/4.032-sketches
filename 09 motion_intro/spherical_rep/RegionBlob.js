function RegionBlob(rgn, yr) {
  var r = rgn;
  var region = regionJSON.regions[r];
  var year = yr;

  // set these empty so they can be set the first time around
  var radius = [];

  this.update = function() {
    for (c in region.members) {
      radius[c].update();
      // if (region.members[c] == 'USA') {
      //   print("HEYYY " + region.members[c]);
      //   print('target is now ' + radius[c].target);
      //   print('value is now ' + radius[c].value);
      // }
    }
  }

  this.display = function() {
    push();
    translate(regionPlacement[r][0], regionPlacement[r][1]);
    noStroke();
    fill(region.color[0], region.color[1], region.color[2], 128);
    ellipse(0,0,20,20);
    beginShape();
    for (c in region.members) {
      let angle = TWO_PI / region.members.length * c;
      let x = map(radius[c].value, dataMin, dataMax, radiusMin, radiusMax) * cos(angle);
      let y = map(radius[c].value, dataMin, dataMax, radiusMin, radiusMax) * sin(angle);
      ellipse(x, y, 10, 10);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.setYear = function(yr) {
    year = yr;
    for (c in region.members) {
      let country = region.members[c];
      let row = dataTable.findRow(country, 'ISO');
      let newRadius = row.getNum(yr);
      if (country == 'USA') {
        print(newRadius);
      }
      if (radius[c] == null) {
        print(" first time ");
        radius[c] = new SoftNum(newRadius);
      } else {
        radius[c].setTarget(newRadius);
      }
    }
  }

  this.setYear(yr);
}
