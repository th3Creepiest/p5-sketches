// The Lorenz Attractor
// by The Coding Train
// https://www.youtube.com/watch?v=f0lkz2gSsIk

const A = 10
const B = 28
const C = 8.0 / 3.0

let x = 0.01
let y = 0
let z = 0
let points = new Array()

function setup() {
  // createCanvas(800, 600, WEBGL)
  createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(HSB)
}

function draw() {
  let dt = 0.01
  let dx = A * (y - x) * dt
  let dy = (x * (B - z) - y) * dt
  let dz = (x * y - C * z) * dt
  let hue = 0
  let camX = map(mouseX, 0, width, -200, 200)
  let camY = map(mouseY, 0, height, -200, 200)

  x = x + dx
  y = y + dy
  z = z + dz
  points.push(new p5.Vector(x, y, z))

  background(0)
  noFill()
  stroke(255)
  camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0)
  translate(0, 0, -120)
  scale(5)

  beginShape()

  for (let v of points) {
    stroke(hue, 255, 255)
    vertex(v.x, v.y, v.z)
    hue += 1
    if (hue > 255) {
      hue = 0
    }
  }

  endShape()
}
