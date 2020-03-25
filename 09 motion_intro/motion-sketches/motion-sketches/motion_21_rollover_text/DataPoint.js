function DataPoint(idx, amt) {
  var index = idx;
  var amount = amt;
  
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;

  // this handles updating any animated variables
  this.update = function() {
    x.update();
    y.update();
  };

  this.display = function() {
    // color the dots in gray, with no outline
    fill(96);
    noStroke();
    ellipse(x.value, y.value, 8, 8);

    cursor(HAND);
    // if the distance from the mouse to the data point is within 10 pixels
    if (dist(mouseX, mouseY, x.value, y.value) < 10) {
      textAlign(CENTER);
      // draw the value of this data point (using 1 decimal point)
      text(nf(amount, 0, 1), x.value, y.value - 10);
    }
  };
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setIndex = function(idx) {
    index = idx;
    // use setTarget() instead of x= so that it will animate
    var newX = map(index, 0, dataCount-1, bounds.left, bounds.right);
    // if this is the first time it's being set, create the SoftNum
    if (x == null) {
      x = new SoftNum(newX);
    } else {
      x.setTarget(newX);
    }
  };

  // this sets the actual value for this data point
  this.setAmount = function(amt) {
    amount = amt;
    // use setTarget() instead of y= so that it will animate
    var newY = map(amt, dataMin, dataMax, bounds.bottom, bounds.top);
    if (y == null) {
      y = new SoftNum(newY);
    } else {
      y.setTarget(newY);
    }
  };
  
  // function to get the data point's value so it can be sorted
  this.getAmount = function() {
    return amount;
  };
  
  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setIndex(idx);
  this.setAmount(amt);
}
