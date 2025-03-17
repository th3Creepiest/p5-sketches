let theShader

function preload() {
  theShader = loadShader("../../shaders/basic.vert", "../../shaders/shader7.frag")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  theShader.setUniform("u_mouse", [mouseX, mouseY])
  shader(theShader)
  rect()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
