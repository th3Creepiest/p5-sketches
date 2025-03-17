const SPEED = 0.18
const TWIRL_SPEED = 0.18
const STEP_SIZE = 7
const FRAME_RATE = 12

let t = 0
let fillSize

function setup() {
  frameRate(FRAME_RATE)
  createCanvas(windowWidth, windowHeight)
  strokeWeight(0.2)
  fillSize = max(width * 1.1, height * 1.1)
  noFill()
}

function draw() {
  background(0, 12) // translucent background (creates trails)
  translate(width / 2, height / 2) // move origin to center
  rotate(t * TWIRL_SPEED) // rotate canvas

  let colors = [
    color(255, 0, 0, 50), // Red
    color(0, 255, 0, 50), // Green
    color(0, 0, 255, 50), // Blue
  ]

  for (let i = 0; i < colors.length; i++) {
    stroke(colors[i])
    for (let y = -fillSize / 2; y < fillSize / 2; y += STEP_SIZE) {
      beginShape()

      let xoff = 0

      for (let x = -fillSize / 2; x < fillSize / 2; x += STEP_SIZE) {
        let angle = map(noise(xoff, y * 0.01, t * 0.01), 0, 1, 0, TWO_PI)
        let yoff = map(sin(angle), -1, 1, -50, 50)
        vertex(x + i, y + yoff + i) // Slight offset for aberration

        xoff += random(0.1, 0.5)
      }
      endShape()
    }
  }

  t += SPEED
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
