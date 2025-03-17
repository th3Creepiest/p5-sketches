// by GPT-4o

let shapes = []
let numShapes = 100

function setup() {
  createCanvas(windowWidth, windowHeight)
  noFill()
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape(random(width), random(height)))
  }
}

function draw() {
  background(0)
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
    this.color = color(random(255), random(255), random(255), random(100, 200))
    this.strokeWeight = random(1, 3)
    this.type = random(["ellipse", "rect", "triangle"])
    this.speed = createVector(random(-2, 2), random(-2, 2))
  }

  update() {
    this.x += this.speed.x
    this.y += this.speed.y

    if (this.x < 0 || this.x > width) this.speed.x *= -1
    if (this.y < 0 || this.y > height) this.speed.y *= -1
  }

  display() {
    stroke(this.color)
    strokeWeight(this.strokeWeight)
    switch (this.type) {
      case "ellipse":
        ellipse(this.x, this.y, this.size, this.size)
        break
      case "rect":
        rect(this.x, this.y, this.size, this.size)
        break
      case "triangle":
        triangle(
          this.x,
          this.y - this.size / 2,
          this.x - this.size / 2,
          this.y + this.size / 2,
          this.x + this.size / 2,
          this.y + this.size / 2
        )
        break
    }
  }
}
