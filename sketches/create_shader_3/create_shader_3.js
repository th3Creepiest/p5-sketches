// https://p5js.org/tutorials/intro-to-shaders/

let myShader

let vert = `
precision highp float;

attribute vec3 aPosition;

// The transform of the object being drawn
uniform mat4 uModelViewMatrix;

// Transforms 3D coordinates to 2D screen coordinates
uniform mat4 uProjectionMatrix;

void main() {
  // Apply the camera transform
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

  // Tell WebGL where the vertex goes
  gl_Position = uProjectionMatrix * viewModelPosition;
}
`

let frag = `
precision highp float;

uniform vec4 myColor;

void main() {
  gl_FragColor = myColor;
}
`

function setup() {
  pixelDensity(1) // disables scaling for retina screens which can create inconsistent scaling between displays
  createCanvas(200, 200, WEBGL)
  myShader = createShader(vert, frag)
}

function draw() {
  background(255)
  noStroke()

  // Use our custom shader
  shader(myShader)

  // Create a color using the mouse's x position as red and
  // its y position as blue, and pass it into the shader
  myShader.setUniform("myColor", [
    map(mouseX, 0, width, 0, 1, true), // Red
    map(mouseY, 0, width, 0, 1, true), // Green
    0, // Blue
    1, // Alpha
  ])

  // Draw a shape using the shader
  circle(0, 0, 100)
}
