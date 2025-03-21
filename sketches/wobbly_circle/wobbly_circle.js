// Wobbly Circle
// by rjgilmour
// https://editor.p5js.org/rjgilmour/sketches/iw2acUoKO

function setup() {
  createCanvas(600, 600)
  x = width / 2 // Circle center x
  y = height / 2 // Circle center y
  r = 100 // Circle radius
  verts = 200 // Number of vertices for drawing the circle
  wobbleSlider = createSlider(0, 200, 100, 1) // How much the circle radius can vary
  smthSlider = createSlider(1, 500, 70, 1) // How smooth the noise function is (higher is smoother)
  t = 1
}

function draw() {
  let wobble = wobbleSlider.value()
  let smth = smthSlider.value()
  background(220)
  t += 0.01
  beginShape()
  for (let i = 0; i < verts; i++) {
    let f = noise((50 * cos((i / verts) * 2 * PI)) / smth + t, (50 * sin((i / verts) * 2 * PI)) / smth + t)
    vertex(x + (r + wobble * f) * cos((i / verts) * 2 * PI), y + (r + wobble * f) * sin((i / verts) * 2 * PI))
  }
  endShape(CLOSE)
}
