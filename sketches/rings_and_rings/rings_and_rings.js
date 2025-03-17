// Rings and Rings
// by jkenzer
// https://editor.p5js.org/jkenzer/sketches/WcnOg0z74

let rings = []
let ringInterval
let numRings = 16

function setup() {
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  colorMode(HSB)
  ringInterval = setInterval(addRing, 900)
}

function draw() {
  background(0)
  translate(width / 2, height / 2)
  rings.forEach((ring) => {
    ring.draw()
  })
}

function addRing() {
  if (rings.length < numRings) {
    let ring = new Ring(300, 0.5)
    rings.push(ring)
  } else {
    clearInterval(ringInterval)
  }
}
class Ring {
  constructor(radius, step) {
    this.originalRadius = radius
    this.radius = radius
    this.step = step
    this.offset = 10
  }

  draw() {
    let color = map(this.radius, 10, this.originalRadius, 1, 360)
    stroke(color, 100, 100)
    noFill()
    beginShape()
    for (let a = 0; a <= 360; a += 5) {
      let offset = map(noise(this.offset), 0, 1, -10, 10)
      let x = this.radius * cos(a) + random(-2, 2) * offset
      let y = this.radius * sin(a) + random(-2, 2) * offset
      vertex(x, y)
    }
    endShape(CLOSE)

    if (this.radius < 5) {
      this.radius = this.originalRadius
    } else {
      this.radius -= this.step
      this.offset += 0.001
    }
    if (this.offset > 10.1) {
      this.offset = 10
    }
  }
}
