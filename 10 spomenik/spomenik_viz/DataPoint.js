function DataPoint(idx) {
  var spomenik = spmkJSON.spomeniks[idx];
  var attributes = [];
  var attrPos = {};

  // store index in relevant designer keys
  for (i in spomenik.designer) {
    attributes.push(spomenik.designer[i]);
    if (attr[spomenik.designer[i]] == null) {
      attr[spomenik.designer[i]] = [idx];
      attrPos[spomenik.designer[i]] = 0;
    } else {
      attrPos[spomenik.designer[i]] = attr[spomenik.designer[i]].length;
      attr[spomenik.designer[i]].push(idx);
    }
    // print(spomenik.designer[i] + attr[spomenik.designer[i]]);
  }

  // store index in relevant material keys
  for (i in spomenik.materials){
    attributes.push(spomenik.materials[i]);
    if (attr[spomenik.materials[i]] == null) {
      attr[spomenik.materials[i]] = [idx];
      attr[spomenik.materials[i]] = [idx];
      attrPos[spomenik.materials[i]] = 0;
    } else {
      attrPos[spomenik.materials[i]] = attr[spomenik.materials[i]].length;
      attr[spomenik.materials[i]].push(idx);
    }
    // print(spomenik.materials[i] + attr[spomenik.materials[i]]);
  }

  // store index in relevant condition keys
  for (i in spomenik.condition){
    attributes.push(spomenik.condition[i]);
    if (attr[spomenik.condition[i]] == null) {
      attr[spomenik.condition[i]] = [idx];
      attr[spomenik.condition[i]] = [idx];
      attrPos[spomenik.condition[i]] = 0;
    } else {
      attrPos[spomenik.condition[i]] = attr[spomenik.condition[i]].length;
      attr[spomenik.condition[i]].push(idx);
    }
    // print(spomenik.condition[i] + attr[spomenik.condition[i]]);
  }

  // print(attributes);
  print(spomenik.title);

  var coords = spomenik.coords;
  var spmkImg = spmkImgs[idx]

  var mapx = map(coords[1], rmap.longitude[0], rmap.longitude[1], rmap.left, rmap.right);
  var mapy = map(coords[0], rmap.latitude[0], rmap.latitude[1], rmap.bottom, rmap.top);

  var x = new SoftNum(mapx);
  var y = new SoftNum(mapy);
  var width = new SoftNum(1);
  var opac = new SoftNum(0);

  this.update = function() {

    // update all variables
    x.update();
    y.update();
    width.update();
    opac.update();

    // feature spomenik if near point zone
    if (dist(mouseX, mouseY, x.value, y.value) < 10) {
      spmkFeature = idx;
      x.setTarget(sb.left);
      y.setTarget(sb.top);
      width.setTarget(sb.width);
      opac.setTarget(255);
    }

    let littleFeature = false;
    for (i in attributes) {
      if (attributes[i] == attrFeature) {
        littleFeature = true;
        if (spmkFeature != idx) {
          let rowN = 5;
          let lx = rmap.width/5*(attrPos[attributes[i]]%rowN);
          let ly = width.value*spmkImg.height/spmkImg.width*floor(attrPos[attributes[i]]/rowN);
          x.setTarget(rmap.left + lx);
          y.setTarget(rmap.bottom + 30 + ly);
          width.setTarget(rmap.width/5);
          opac.setTarget(0);
        }
      }
    }

    // send back to map if not featured
    if ((spmkFeature != idx) && !littleFeature) {
      x.setTarget(mapx);
      y.setTarget(mapy);
      width.setTarget(1);
      opac.setTarget(0);
    }

  }

  this.display = function() {
    fill(186, 86, 36);
    try {
      image(spmkImg, x.value, y.value, width.value, width.value*spmkImg.height/spmkImg.width);
    }
    catch(TypeError) {
      print(idx);
    }
    circle(x.value, y.value, 10);

    push();
    translate(sb.left, sb.top + sb.width*spmkImg.height/spmkImg.width)

    // title text
    fill(255, 255, 255, opac.value);
    stroke(0, 0, 0, opac.value);
    strokeWeight(4)
    textSize(72);
    text(spomenik.title, 15, -20);
    // rect(15, 20, sb.width-60, 80);

    // name, location text
    fill(100, 100, 100, opac.value);
    noStroke();
    textSize(18);
    text(spomenik.name + '\n' + spomenik.location, 15, 20, sb.width-60, 80);
    pop();


    textSize(18);
    fill(186, 86, 36, opac.value);
    stroke(186, 86, 36, opac.value);
    strokeWeight(1);
    let attrText = '';

    // designer text
    text('Designed by', sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 120);
    attrText = '';
    for (i in spomenik.designer) {
      attrText += spomenik.designer[i] + ', ';
      let cx = sb.left + 135 + i*20;
      let cy = sb.top + sb.width*spmkImg.height/spmkImg.width + 114;
      circle(cx, cy, 10);
      if ((dist(mouseX, mouseY, cx, cy) < 10) && (spmkFeature == idx)) {
        attrFeature = spomenik.designer[i];
      }
    }
    push();
    fill(100, 100, 100, opac.value);
    noStroke();
    text(attrText, sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 148);
    pop();

    // materials text
    text('Made with', sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 190);
    attrText = '';
    for (i in spomenik.materials) {
      attrText += spomenik.materials[i] + ', ';
      let cx = sb.left + 135 + i*20;
      let cy = sb.top + sb.width*spmkImg.height/spmkImg.width + 184;
      circle(cx, cy, 10);
      if ((dist(mouseX, mouseY, cx, cy) < 10) && (spmkFeature == idx)) {
        attrFeature = spomenik.materials[i];
      }
    }
    push();
    fill(100, 100, 100, opac.value);
    noStroke();
    text(attrText, sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 218);
    pop();

    // condition text
    text('In condition', sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 260);
    attrText = '';
    for (i in spomenik.condition) {
      attrText += spomenik.condition[i] + ', ';
      let cx = sb.left + 135 + i*20;
      let cy = sb.top + sb.width*spmkImg.height/spmkImg.width + 254;
      circle(cx, cy, 10);
      if ((dist(mouseX, mouseY, cx, cy) < 10) && (spmkFeature == idx)) {
        attrFeature = spomenik.condition[i];
      }
    }
    push();
    fill(100, 100, 100, opac.value);
    noStroke();
    text(attrText, sb.left + 15, sb.top + sb.width*spmkImg.height/spmkImg.width + 288);
    pop();

  }
}
