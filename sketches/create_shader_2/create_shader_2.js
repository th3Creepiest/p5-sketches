// https://p5js.org/tutorials/intro-to-shaders/

let myShader

let vert = `
precision highp float;

attribute vec3 aPosition;

// The transform of the object being drawn
uniform mat4 uModelViewMatrix;

// Transforms 3D coordinates to 2D screen coordinates
uniform mat4 uProjectionMatrix;

// A custom uniform with the time in milliseconds
uniform float time;

void main() {
  // Apply the camera transform
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

  // Use the time to adjust the position of the vertices
  viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1);

  // Tell WebGL where the vertex goes
  gl_Position = uProjectionMatrix * viewModelPosition;
}
`

let frag = `
precision highp float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

function setup() {
  createCanvas(200, 200, WEBGL)
  myShader = createShader(vert, frag)
}

function draw() {
  background(255)
  noStroke()

  // Use our custom shader
  shader(myShader)

  // Pass the time from p5 to the shader
  myShader.setUniform("time", millis())

  // Draw a shape using the shader
  circle(0, 0, 100)
}
