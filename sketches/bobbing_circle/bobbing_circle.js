const BOB_AMPLITUDE = 50
const ANGLE_INCREMENT = 0.05

let yOffset
let angle = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  yOffset = sin(angle) * BOB_AMPLITUDE

  if (angle > 2 * PI) angle = 0
  angle += ANGLE_INCREMENT

  background(10)
  noStroke()
  fill(200, 100, 150)
  ellipse(width / 2, height / 2 + yOffset, 100, 100)
}
