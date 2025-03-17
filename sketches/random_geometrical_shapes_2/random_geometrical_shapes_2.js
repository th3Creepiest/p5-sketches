// by GPT-4o

let shapes = []
let numShapes = 200
let grungeTexture

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
  for (let shape of shapes) {
    shape.update()
    shape.display()
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
  }

  update() {
    this.x += this.speed.x
    this.y += this.speed.y
    this.rotation += this.rotationSpeed

    if (this.x < 0 || this.x > width) this.speed.x *= -1
    if (this.y < 0 || this.y > height) this.speed.y *= -1
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
}
