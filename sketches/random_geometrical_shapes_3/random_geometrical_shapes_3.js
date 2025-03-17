// by GPT-4o

let shapes = []
let particles = []
let numShapes = 150 // Reduced number of shapes to improve performance
let grungeTexture
let burstInterval = 60 // Interval for rhythmic bursts
let burstTimer = 0

function preload() {
  grungeTexture = loadImage("../../assets/asphalt-light.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noFill()
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape(random(width), random(height)))
  }
}

function draw() {
  background(0)
  image(grungeTexture, 0, 0, width, height)
  blendMode(ADD)
  for (let shape of shapes) {
    shape.update()
    shape.display()
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update()
    particles[i].display()
    if (particles[i].lifetime <= 0) {
      particles.splice(i, 1) // Remove particles with no lifetime left
    }
  }
  blendMode(BLEND)

  // Increment burst timer and trigger bursts at intervals
  burstTimer++
  if (burstTimer >= burstInterval) {
    burstTimer = 0
    for (let shape of shapes) {
      shape.explode()
    }
  }
}

class Shape {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = random(20, 100)
    this.color = color(random(255), random(255), random(255), random(50, 200))
    this.strokeWeight = random(1, 5)
    this.type = random(["ellipse", "rect", "triangle", "line"])
    this.speed = createVector(random(-3, 3), random(-3, 3))
    this.rotation = random(TWO_PI)
    this.rotationSpeed = random(-0.05, 0.05)
    this.exploded = false
  }

  update() {
    this.x += this.speed.x
    this.y += this.speed.y
    this.rotation += this.rotationSpeed

    // Alter size and color over time
    this.size += sin(frameCount * 0.1) * 0.5
    this.color = color(random(255), random(255), random(255), random(50, 200))

    if (this.x < 0 || this.x > width) this.speed.x *= -1
    if (this.y < 0 || this.y > height) this.speed.y *= -1

    if (!this.exploded && random(1) < 0.01) {
      this.explode()
    }
  }

  display() {
    push()
    translate(this.x, this.y)
    rotate(this.rotation)
    stroke(this.color)
    strokeWeight(this.strokeWeight)
    switch (this.type) {
      case "ellipse":
        ellipse(0, 0, this.size, this.size)
        break
      case "rect":
        rect(0, 0, this.size, this.size)
        break
      case "triangle":
        triangle(0, -this.size / 2, -this.size / 2, this.size / 2, this.size / 2, this.size / 2)
        break
      case "line":
        line(-this.size / 2, 0, this.size / 2, 0)
        break
    }
    pop()
  }

  explode() {
    this.exploded = true
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(this.x, this.y, this.color))
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.size = random(5, 20)
    this.color = color
    this.speed = createVector(random(-5, 5), random(-5, 5))
    this.lifetime = 255
  }

  update() {
    this.x += this.speed.x
    this.y += this.speed.y
    this.lifetime -= 5
  }

  display() {
    noStroke()
    fill(red(this.color), green(this.color), blue(this.color), this.lifetime)
    ellipse(this.x, this.y, this.size, this.size)
  }
}
