// https://p5js.org/tutorials/animating-with-media-objects/

let flower1
let flower2
let flower3
let water

let garden

let flowerY = 200

function preload() {
  flower1 = loadImage("../../assets/flower-1.png")
  flower2 = loadImage("../../assets/flower-2.png")
  flower3 = loadImage("../../assets/flower-3.png")
  water = loadImage("../../assets/water_can.gif")
}

function setup() {
  // Set a 400x400 px canvas.
  createCanvas(400, 400)

  // Create a p5.Graphics object
  // to render the flowers.
  garden = createGraphics(400, 400)

  // Position images using
  // center coordinates.
  imageMode(CENTER)

  // Resize the images.
  flower1.resize(100, 100)
  flower2.resize(100, 100)
  flower3.resize(100, 100)

  // Resize the GIF.
  water.resize(50, 50)

  // start sketch with the GIF in pause mode.
  water.pause()
}

function draw() {
  background(255)
  drawStems()

  // Draw the graphics object.
  image(garden, width / 2, height / 2)

  // Draw the watering can GIF.
  image(water, mouseX, mouseY)

  // Draw the pointillism effect.
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, 120, 160) < 50) {
      paintFlower(flower1, 50, 100)
    }
    if (dist(mouseX, mouseY, 220, 160) < 50) {
      paintFlower(flower2, 150, 100)
    }
    if (dist(mouseX, mouseY, 320, 160) < 50) {
      paintFlower(flower3, 250, 100)
    }
  }
}

// Paint a flower using the
// pointillism effect.
function paintFlower(img, x, y) {
  // Source a random pixel's color from the image.
  let sourceX = random(0, img.width)
  let sourceY = random(0, img.height)
  let c = img.get(sourceX, sourceY)

  // Draw the points onto our graphics object.
  garden.stroke(c)
  garden.strokeWeight(random(5, 10))
  garden.point(sourceX + x, sourceY + y)
}

function mousePressed() {
  // Play GIF when the mouse is pressed.
  water.play()
}
function mouseReleased() {
  // Resets and pauses the GIF when
  // mouse is not being pressed.
  water.reset()
  water.pause()
}

function drawStems() {
  // Draw individual stems.
  stroke("brown")
  strokeWeight(3)
  line(100, 400, 100, flowerY)
  line(200, 400, 200, flowerY)
  line(300, 400, 300, flowerY)
}

function keyPressed() {
  // Reset the painting when
  // any key is pressed.
  garden.clear()
}
