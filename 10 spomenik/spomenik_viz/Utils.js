function siteCanvas(z = 'bg', nav = true) {
  let y = 0;
  if (nav && document.getElementsByClassName("navbar").length > 0) {
    y = document.getElementsByClassName("navbar")[0].offsetHeight;
  }

  canvas = createCanvas(0, 0);
  siteResized();
  canvas.position(0, y);
  if (z == 'bg') {canvas.style('z-index', '-1')}
  else if (z == 'fg') {canvas.style('z-index', '100')}
  else {throw 'Canvas Position invalid'}

  return canvas;
}

function siteResized() {
  let h;
  if (windowHeight > document.body.scrollHeight) {h = windowHeight}
  else {h = document.body.scrollHeight};
  let w;
  if (windowHeight > document.body.scrollWidth) {w = windowWidth}
  else {w = document.body.scrollWidth};
  resizeCanvas(w, h);
}
