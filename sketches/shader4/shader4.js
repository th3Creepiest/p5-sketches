let theShader

function preload() {
  theShader = loadShader("../../shaders/basic.vert", "../../shaders/shader4.frag")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  theShader.setUniform("u_time", millis() / 1000.0)
  shader(theShader)
  rect()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
