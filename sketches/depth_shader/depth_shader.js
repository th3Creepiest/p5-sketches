// https://p5js.org/reference/p5.Framebuffer/depth/

// An object that stores the framebuffer's depth data.
// Each framebuffer uses a WebGLTexture object internally to store its depth data.
// The myBuffer.depth property makes it possible to pass this data directly to other functions.
// For example, calling texture(myBuffer.depth) or myShader.setUniform('depthTexture', myBuffer.depth) may be helpful for advanced use cases.

// Note: By default, a framebuffer's y-coordinates are flipped compared to images and videos.
// It's easy to flip a framebuffer's y-coordinates as needed when applying it as a texture.
// For example, calling plane(myBuffer.width, -myBuffer.height) will flip the framebuffer.

// Note: A "uniform" is a global variable within a shader program.

// Create a string with the vertex shader program.
// The vertex shader is called for each vertex.
let vertSrc = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying vec2 vTexCoord;

void main() {
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * viewModelPosition;
  vTexCoord = aTexCoord;
}
`

// Create a string with the fragment shader program.
// The fragment shader is called for each pixel.
let fragSrc = `
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D depth;

void main() {
  // Get the pixel's depth value.
  float depthVal = texture2D(depth, vTexCoord).r;

  // Set the pixel's color based on its depth.
  gl_FragColor = mix(
    vec4(0., 0., 0., 1.),
    vec4(1., 0., 1., 1.),
    depthVal);
}
`

let myBuffer
let myShader

function setup() {
  createCanvas(400, 400, WEBGL)

  // Create a p5.Framebuffer object.
  myBuffer = createFramebuffer()

  // Create a p5.Shader object.
  myShader = createShader(vertSrc, fragSrc)

  // Compile and apply the shader.
  shader(myShader)

  describe("The shadow of a box rotates slowly against a magenta background.")
}

function draw() {
  // Draw to the p5.Framebuffer object.
  myBuffer.begin()
  background(255)
  rotateX(frameCount * 0.01)
  box(20, 20, 80)
  myBuffer.end()

  // Set the shader's depth uniform using
  // the framebuffer's depth texture.
  myShader.setUniform("depth", myBuffer.depth)

  // Style the plane.
  noStroke()

  // Draw the plane.
  plane(myBuffer.width, myBuffer.height)
}
