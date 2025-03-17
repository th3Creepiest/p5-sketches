// https://p5js.org/tutorials/intro-to-shaders/

let myShader

let vert = `
precision mediump float;
attribute vec3 aPosition;
void main() {
  // Copy the position data into a vec4, adding 1.0 as the w parameter
    vec4 positionVec4 = vec4(aPosition, 1.0);
  // Scale to make the output fit the canvas
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  // Send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}
`

let frag = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

function setup() {
  createCanvas(250, 250, WEBGL)
  myShader = createShader(vert, frag)
}

function draw() {
  background(255)
  noStroke()

  // Use our custom shader
  shader(myShader)

  // Draw a shape using the shader
  circle(0, 0, 100)
}
