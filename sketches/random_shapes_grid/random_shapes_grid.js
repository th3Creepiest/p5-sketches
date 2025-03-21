// Random Shapes Grid
// by Monica.dev
// https://codepen.io/M0nica/pen/BaqvVra

function setup() {
  createCanvas(windowWidth, windowHeight)
  background("#faf4fb")
  colorMode(HSB)
  frameRate(5)
  noStroke()
}

function draw() {
  noLoop()
  background("#faf4fb")
  let sz = 60
  let numOfColumns = windowWidth / 5 // 12;
  let numOfRows = windowHeight / 5 //12;

  const colorCatalog = [
    ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#F9F871"],
    ["#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"],
    ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8", "#48cae4", "#90e0ef", "#ade8f4", "#caf0f8"],
    ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"],
    ["#ffe5ec", "#ffc2d1", "#ffb3c6", "#ff8fab", "#fb6f92"],
    ["#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc"],
    ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"],
  ]

  const colors = random(colorCatalog)
  let spacing = 70
  for (let row = 0; row < numOfRows; row++) {
    let x = row * spacing
    for (let column = 0; column < numOfRows; column++) {
      let y = column * spacing

      let col = random(colors)
      fill(col)

      square(x, y, sz, random(5, 75), random(5, 75), random(5, 75), random(5, 75))
    }
  }
}

function mousePressed() {
  redraw()
}

function keyPressed() {
  const SPACEBAR = " "
  if (key == SPACEBAR || key == "r") {
    redraw()
  }

  if (key === "s") {
    saveCanvas("random-shapes-grid")
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
