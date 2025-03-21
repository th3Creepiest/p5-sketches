// Rotating Polar Perlin Noise Loops
// by Monica.dev
// https://codepen.io/M0nica/pen/vYVPzyL
// Based on The Coding Train: Coding Challenge #136.1: Polar Perlin Noise Loops
// https://www.youtube.com/watch?v=ZI1dmHv3MeM

let phase = 0
let noiseMax = 0.75
let slider
let zOff = 0
function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#e9e0f0")

  slider = createSlider(2, 10, 0, 0.1)
  strokeWeight(4)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  //noLoop();
  background("#2b2135")
  translate(width / 2, height / 2)

  //stroke(255);
  stroke("#b4aaff")
  noFill()

  noiseMax = slider.value()
  // let xOff = 0;

  for (let i = 1; i < 5; i++) {
    beginShape()
    for (let a = 0; a < TWO_PI; a += 0.01) {
      //// let r = 100;//random (50, 100)

      let xOff = map(cos(a + phase), -1, 1, 0, noiseMax)
      let yOff = map(sin(a + phase), -1, 1, 0, noiseMax)
      let r = map(noise(xOff, yOff, zOff), 0, 1, 100, 200) * (i * 0.7)
      let x = r * cos(a)
      let y = r * sin(a)
      vertex(x, y)
      // xOff = xOff + 0.01
    }
    endShape(CLOSE)
  }
  phase += 0.003
  zOff += 0.01
  //  xOff = xOff + 0.01
}

function keyPressed() {
  if (key === "g") {
    saveGif("polar-perlin-noise-loops", 20)
  }
  if (key === "s") {
    saveCanvas("polar-perlin-noise-loops")
  }
}
