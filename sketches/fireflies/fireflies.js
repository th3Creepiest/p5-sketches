/*******************************************************************************
 * Firefly -  Flickering fireflies will attempt to synchronize with their
 *            neighbors.
 * Michael Ruppe
 *
 *
 * The fireflies flicker for now, but I haven't implemented the synchronization
 * behavior - fireflies should be influenced by their neighbors behavior.
 ******************************************************************************/

let fireflies = []
let frameCount = 1

function setup() {
  createCanvas(400, 400)
  frameRate(30)
  for (let i = 0; i < (width * height) / 5000; i++) {
    fireflies[i] = new Firefly(random(width), random(height))
  }

  //once all fireflies generated, populate each with a list of neighbor IDs
  for (let i = 0; i < fireflies.length; i++) {
    for (let j = 0; j < fireflies.length; j++) {
      if (i == j) continue //no need to compare against self
      // ToDo Radius
      if (abs(fireflies[i].x - fireflies[j].x) < 100 && abs(fireflies[i].y - fireflies[j].y) < 100) {
        // close neighbors
        fireflies[i].neighbors.push(fireflies[j])
      }
    }
  }
  // fireflies[0].wait = fireflies[1].wait;
}

function draw() {
  background(0)
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].update()
    fireflies[i].show()

    // TODO
    //Evolve the timing to better suit neighbors
    //check if neighbors states are different.
    //if different, nudge start time/end time
  }

  frameCount++
}

function Firefly(x, y) {
  this.x = x
  this.y = y
  this.start = floor(random(-100, 100))
  if (this.start <= 0) {
    this.state = "on"
  } else {
    this.state = "off"
  }
  this.duration = floor(random(20, 100))
  this.end = this.start + this.duration

  this.neighbors = []

  this.update = function () {
    //Determine when to blink on/off given current timing parameters
    if (frameCount > this.start && this.state == "off") {
      this.state = "on"
      this.end = frameCount + this.duration
    } else if (frameCount > this.end && this.state == "on") {
      this.state = "off"
      this.start = frameCount + this.duration
    }

    // at transition to on, check state of neighbors and nudge time
    for (let i in this.neighbors) {
      if (this.state == "off" && i.state == "on") {
      }
      // check if neighbor is different state
      if (this.start > i.start) this.start -= 5
      else if (this.start < i.start) this.start += 5
    }
  }

  this.show = function () {
    if (this.state == "on") {
      fill(200, 255, 0)
      noStroke()
      ellipse(this.x, this.y, 8, 8)
    } else {
      fill(255, 50)
      noStroke()
      ellipse(this.x, this.y, 8, 8)
    }
  }
}
