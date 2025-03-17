// Terrain Generation with Perlin Noise
// by The Coding Train
// https://www.youtube.com/watch?v=IKB1hWWedMk

const FRAMERATE = 12
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const TERRAIN_WIDTH = 600
const TERRAIN_HEIGHT = 666
const TERRAIN_SCALE = 20
const FLY_SPEED = 0.1
const COLS = TERRAIN_WIDTH / TERRAIN_SCALE
const ROWS = TERRAIN_HEIGHT / TERRAIN_SCALE

let flying = 0
let terrain = []

function setup() {
  frameRate(FRAMERATE)
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL)

  for (let x = 0; x < COLS; x++) {
    terrain[x] = []
    for (let y = 0; y < ROWS; y++) {
      terrain[x][y] = 0
    }
  }
}

function draw() {
  flying -= FLY_SPEED
  let y_offset = flying

  for (let y = 0; y < ROWS; y++) {
    let x_offset = 0
    for (let x = 0; x < COLS; x++) {
      terrain[x][y] = map(noise(x_offset, y_offset), 0, 1, -100, 100)
      x_offset += 0.2
    }
    y_offset += 0.2
  }

  background(0)
  fill(255, 255, 255, 180)
  rotateX(PI / 3)
  translate(-TERRAIN_WIDTH / 2, -TERRAIN_HEIGHT / 2 + 50)

  for (let y = 0; y < ROWS - 1; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < COLS; x++) {
      vertex(x * TERRAIN_SCALE, y * TERRAIN_SCALE, terrain[x][y])
      vertex(x * TERRAIN_SCALE, (y + 1) * TERRAIN_SCALE, terrain[x][y + 1])
    }
    endShape()
  }
}
