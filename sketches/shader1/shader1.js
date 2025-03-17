let theShader

function preload() {
  theShader = loadShader("../../shaders/basic.vert", "../../shaders/shader1.frag")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  shader(theShader)
  rect()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
