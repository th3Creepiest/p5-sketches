// Filter Image Colors
// by Monica.dev
// https://codepen.io/M0nica/pen/gOQJapp

function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#ed225d")
  noStroke()
  textStyle(BOLD)
  textSize(50)
}

function draw() {
  clear() // clear canvas of elements from previous draw
  background("white")
  color("#e0b1cb")
  drawGrid()
  color("#e0b1cb")
}

function drawGrid() {
  let sz = width / 16
  let numOfRows = 16
  let visible = 16 - ((frameCount / 10) % 50) >= -1 ? 16 - ((frameCount / 10) % 50) : 16

  const colors = ["#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"]
  const offWhite = "#e8dfe4"
  let spacing = width * 0.06
  rectMode(CORNER)

  for (let row = 0; row < numOfRows; row++) {
    let x = row * (spacing * 1.2)
    for (let column = 0; column < numOfRows; column++) {
      let y = column * (spacing * 1.2)

      let col = colors[(column + row) % colors.length]

      if ((col == "#5e548e" || col == "#9f86c0") && column > visible) {
        col = offWhite
      }
      fill(col)

      square(x, y, sz)
    }
  }

  fill("#e0b1cb")
}

function keyPressed() {
  const SPACEBAR = " "
  // pause/play animation when spacebar is pressed for sketches that animate from draw to draw
  if (key == SPACEBAR) {
    isLooping() ? noLoop() : loop()
  }

  if (key === "g") {
    saveGif("canvas", 15)
  }
  if (key === "s") {
    saveCanvas("canvas")
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
