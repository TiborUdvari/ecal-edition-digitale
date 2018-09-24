var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

var _min = 0.25;
var _max = 0.5;

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();

  // Do not do anything when micro 
  // did not get any values

  if ((typeof vol === 'undefined') ){
    return;
  }

  if (vol < _min) {
    _min = vol;
  }

  if (vol > _max) {
    _max = vol;
  }

  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, _min, _max / 5, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}