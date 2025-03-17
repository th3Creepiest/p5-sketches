// by Claude 3.5 Sonnet

const TRAIL_LENGTH = 8
const BG_ALPHA = 120

let ball
let trail = []

function setup() {
  createCanvas(400, 400)
  ball = {
    x: 100,
    y: 100,
    size: random(25, 50),
    xSpeed: random(3, 8),
    ySpeed: random(3, 8),
    rotation: 0,
    rotationSpeed: random(-0.1, 0.1),
    pulsePhase: 0,
    color: {
      r: 255,
      g: 255,
      b: 255,
    },
  }
}

function draw() {
  background(0, BG_ALPHA)

  // Update ball position
  ball.x += ball.xSpeed
  ball.y += ball.ySpeed

  // Update rotation and pulse
  ball.rotation += ball.rotationSpeed
  ball.pulsePhase += 0.05
  let pulseFactor = 1 + sin(ball.pulsePhase) * 0.2

  // Get new size before checking boundaries
  let newSize = random(30, 70)

  // Check if ball would be out of bounds with new size
  let bounced = false

  if (ball.x + newSize / 2 > width || ball.x - newSize / 2 < 0) {
    // If out of bounds horizontally, adjust position before applying new properties
    ball.x = constrain(ball.x, newSize / 2, width - newSize / 2)
    ball.xSpeed *= -1.1 + random(0.2)
    bounced = true
  }

  if (ball.y + newSize / 2 > height || ball.y - newSize / 2 < 0) {
    // If out of bounds vertically, adjust position before applying new properties
    ball.y = constrain(ball.y, newSize / 2, height - newSize / 2)
    ball.ySpeed *= -1.1 + random(0.2)
    bounced = true
  }

  // Update properties if ball bounced off any wall
  if (bounced) {
    ball.size = newSize
    ball.rotationSpeed = random(-0.1, 0.1)
  }

  // Update trail
  trail.push({ x: ball.x, y: ball.y, size: ball.size * pulseFactor, color: { ...ball.color } })
  if (trail.length > TRAIL_LENGTH) {
    trail.shift()
  }

  // Draw trail
  for (let i = 0; i < trail.length; i++) {
    let alpha = (i / trail.length) * 128
    fill(trail[i].color.r, trail[i].color.g, trail[i].color.b, alpha)
    noStroke()
    push()
    translate(trail[i].x, trail[i].y)
    rotate(ball.rotation * (i / trail.length))
    ellipse(0, 0, trail[i].size, trail[i].size)
    pop()
  }

  // Draw the ball
  fill(ball.color.r, ball.color.g, ball.color.b)
  push()
  translate(ball.x, ball.y)
  rotate(ball.rotation)
  ellipse(0, 0, ball.size * pulseFactor, ball.size * pulseFactor)

  // Add a simple design to show rotation
  stroke(0)
  line(-ball.size / 4, 0, ball.size / 4, 0)
  pop()
}
