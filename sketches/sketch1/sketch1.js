// https://p5js.org/tutorials/setting-up-your-environment/

function setup() {
  createCanvas(windowWidth, windowHeight)
  background("pink")
}

function draw() {
  if (mouseIsPressed === true) {
    fill("pink")
    noStroke()
  } else {
    fill(255)
    stroke(0)
  }

  circle(mouseX, mouseY, 100)
}
