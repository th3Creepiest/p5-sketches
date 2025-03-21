const CIRCLE_SIZE_RATIO = 0.2;

let circleSize
let circleX, circleY

function setup() {
  createCanvas(windowWidth, windowHeight)

  // set the circleSize to a ratio of the smallest dimension of the canvas
  circleSize = min(width, height) * CIRCLE_SIZE_RATIO

  // set initial circle position at the middle of the canvas
  circleX = width / 2
  circleY = height / 2
}

function draw() {
  background(30)
  fill(200)
  ellipse(circleX, circleY, circleSize)
}

function mousePressed() {
  const d = dist(mouseX, mouseY, circleX, circleY)
  if (d < circleSize / 2) {
    console.log("Circle clicked!")

    // spawn circle at random position
    circleX = random(circleSize, width - circleSize)
    circleY = random(circleSize, height - circleSize)
  }
}
