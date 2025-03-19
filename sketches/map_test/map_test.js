let circleX, circleY, circleSize

function setup() {
  createCanvas(windowWidth, windowHeight)
  circleX = width / 2
  circleY = height / 2
}

function draw() {
  circleX = mouseX
  circleY = mouseY
  circleSize = map(circleY, 0, height, 50, 200)

  fill(255)
  background(0)
  ellipse(circleX, circleY, circleSize, circleSize)
}
