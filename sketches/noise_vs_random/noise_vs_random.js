// Noise vs Random
// by Monica.dev
// https://codepen.io/M0nica/pen/dygwLNO

let inc = 0.01
let start = 0
let slider

function setup() {
  // slider = createSlider(0, 255, 100);
  // slider.position(10, 10);
  // slider.style("width", "80px");
  createCanvas(800, 400)
  background("#e9e0f0")
  frameRate(10)
}

function circleBg(xOffset) {
  fill("#780b40")
  square(xOffset, 25, 325, 400)
  noFill()
}

function noiseLine() {
  beginShape()
  circleBg(35)
  /* draw line using values generated with noise on the left side of canvas */
  let xoff = start
  for (let x = 0; x < width / 2 - 50; x++) {
    stroke("#e9e0f0")
    let y = map(noise(xoff), 0, 1, 0, height)
    vertex(x, y)
    xoff += inc
  }
  endShape()
}

function randomLine() {
  /* draw line using random values on the right side of canvas */
  circleBg(400)
  beginShape()
  let xoff2 = start
  for (let x = width / 2; x < width; x++) {
    let y = map(random(xoff2), 0, xoff2, 0, height)
    vertex(x, y)
    xoff2 += inc
  }
  endShape()
}

function draw() {
  background("#e9e0f0")
  noiseLine()
  randomLine()
  start += inc
}

function keyPressed() {
  const SPACEBAR = " "
  // pause/play animation when spacebar is pressed
  if (key == SPACEBAR) {
    isLooping() ? noLoop() : loop()
  }

  if (key === "s") {
    saveCanvas("noiseVsRandomGraph")
  }
}
