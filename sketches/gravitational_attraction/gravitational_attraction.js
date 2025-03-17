// Gravitational Attraction
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/EpgB3cNhKPM
// https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html
// https://editor.p5js.org/codingtrain/sketches/MkLraatd

let movers = []
let attractor

function setup() {
  createCanvas(600, 600)
  for (let i = 0; i < 10; i++) {
    let x = random(width)
    let y = random(height)
    let m = random(50, 150)
    movers[i] = new Mover(x, y, m)
  }
  attractor = new Attractor(width / 2, height / 2, 100)
  background(0)
}

function draw() {
  background(0)
  for (let mover of movers) {
    mover.update()
    mover.show()
    attractor.attract(mover)
  }
  if (mouseIsPressed) {
    attractor.pos.x = mouseX
    attractor.pos.y = mouseY
  }
  attractor.show()
}

class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y)
    this.mass = m
    this.r = sqrt(this.mass) * 2
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos)
    let distanceSq = constrain(force.magSq(), 100, 1000)
    let G = 5
    let strength = (G * (this.mass * mover.mass)) / distanceSq
    force.setMag(strength)
    mover.applyForce(force)
  }

  show() {
    noStroke()
    fill(255, 0, 100)
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }
}

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y)
    this.vel = p5.Vector.random2D()
    this.vel.mult(5)
    this.acc = createVector(0, 0)
    this.mass = m
    this.r = sqrt(this.mass) * 2
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acc.add(f)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0, 0)
  }

  show() {
    stroke(255)
    strokeWeight(2)
    fill(255, 100)
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }
}
