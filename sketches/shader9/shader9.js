let theShader

function preload() {
  theShader = loadShader("../../shaders/basic.vert", "../../shaders/shader9.frag")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  theShader.setUniform("u_resolution", [width, height])
  shader(theShader)
  rect()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
