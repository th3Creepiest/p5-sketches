// https://p5js.org/tutorials/variables-and-change/

//custom variable for x coordinate of clouds
let cloudOneX = 50

//custom variable for shooting stars
let line_x_one = 0
let line_y_one = 0

function setup() {
  createCanvas(400, 400)
}

function draw() {
  background("navy") //navy background
  frameRate(15) //set frame rate to 15

  //shooting star
  stroke("yellow")
  line(line_x_one, line_y_one, line_x_one + 30, line_y_one - 30)

  //moon
  fill(255)
  stroke(0)
  circle(350, 50, 100)

  //overlap by navy circle for crescent moon
  stroke("navy")
  fill("navy")
  circle(320, 50, 100)

  //big gray mountains
  stroke(0)
  fill(80)
  triangle(-40, 300, 75, 100, 250, 300)
  triangle(100, 300, 300, 100, 500, 300)

  //grass
  fill("rgb(50,76,50)")
  rect(0, 300, 400, 100)

  //clouds
  fill(255)
  ellipse(cloudOneX, 50, 80, 40)
  ellipse(cloudOneX - 40, 100, 60, 20)
  ellipse(cloudOneX + 20, 150, 40, 10)

  //growing trees
  //trunk
  fill("rgb(118,80,72)")
  rect(40, 270, 15, 50)

  //leaves
  fill("green")
  triangle(25, 270, 45, 240 - (frameCount % 290), 70, 270)

  //trunk
  fill("rgb(118,80,72)")
  rect(340, 330, 15, 50)

  //leaves
  fill("green")
  triangle(325, 330, 345, 240 - (frameCount % 290), 370, 330)

  //sets the x coordinate to the frame count
  //resets at left edge
  cloudOneX = frameCount % width

  //set shooting star to random location
  line_x_one = random(0, width)
  line_y_one = random(0, height / 2)
}
