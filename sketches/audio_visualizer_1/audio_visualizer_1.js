// by Claude using Cursor

const themes = [
  { bg: [17, 17, 17], bars: [255, 105, 180], particles: [255, 255, 255] }, // Pink
  { bg: [0, 0, 30], bars: [0, 255, 255], particles: [100, 200, 255] }, // Blue
  { bg: [20, 0, 20], bars: [0, 255, 0], particles: [200, 255, 100] }, // Green
  { bg: [30, 10, 0], bars: [255, 165, 0], particles: [255, 215, 0] }, // Orange/Gold
]

let sound
let fft
let audioFile
let playing = false
let particles = []
let theme = 0

let playPauseButton
let themeToggleButton
let audioInput

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(RGB)
  angleMode(DEGREES)

  // Initialize audio context explicitly
  userStartAudio()
    .then(() => {
      console.log("Audio context started successfully")
    })
    .catch((err) => {
      console.error("Error starting audio context:", err)
    })

  // Set up audio analysis
  fft = new p5.FFT(0.8, 512)

  // Set up DOM element event listeners
  playPauseButton = select("#play-pause")
  themeToggleButton = select("#theme-toggle")
  audioInput = select("#audio-file")

  playPauseButton.mousePressed(togglePlay)
  themeToggleButton.mousePressed(changeTheme)
  audioInput.changed(handleFileSelect)

  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle())
  }
}

function draw() {
  // Set background based on theme
  background(themes[theme].bg)

  // Center the visualization
  translate(width / 2, height / 2)

  // Analyze the audio if it's loaded
  if (sound && sound.isLoaded()) {
    // Get frequency data
    let spectrum = fft.analyze()

    // Draw frequency bars and update particles
    drawFrequencyCircle(spectrum)
    updateParticles(spectrum)
  } else {
    // Draw placeholder circle when no audio is loaded
    noFill()
    stroke(themes[theme].bars)
    strokeWeight(2)
    circle(0, 0, 300)
    fill(255)
    textAlign(CENTER)
    noStroke()
    text("Select an audio file to start", 0, 0)
  }
}

function drawFrequencyCircle(spectrum) {
  noFill()
  strokeWeight(3)

  // Draw multiple frequency circles
  for (let j = 0; j < 3; j++) {
    beginShape()
    for (let i = 0; i < 360; i += 5) {
      let index = floor(map(i, 0, 360, 0, spectrum.length))
      let r = map(spectrum[index], 0, 255, 100 + j * 50, 250 + j * 70)
      let x = r * cos(i)
      let y = r * sin(i)
      vertex(x, y)
    }
    endShape(CLOSE)

    // Use theme colors with decreasing opacity for outer circles
    let barColor = themes[theme].bars
    stroke(barColor[0], barColor[1], barColor[2], 255 - j * 70)
  }
}

function updateParticles(spectrum) {
  // Draw and update particles
  let particleColor = themes[theme].particles
  for (let i = 0; i < particles.length; i++) {
    // Get amplitude at the frequency this particle responds to
    let index = floor(map(i, 0, particles.length, 0, spectrum.length))
    let amp = spectrum[index]

    // Boost the particle speed based on amplitude
    particles[i].update(amp)
    particles[i].draw(particleColor)
  }
}

function togglePlay() {
  if (sound && sound.isLoaded()) {
    if (playing) {
      sound.pause()
      playPauseButton.html("Play")
    } else {
      sound.play()
      playPauseButton.html("Pause")
    }
    playing = !playing
  }
}

function changeTheme() {
  theme = (theme + 1) % themes.length
}

function handleFileSelect() {
  // If currently playing, stop it
  if (sound && sound.isLoaded() && playing) {
    sound.stop()
    playing = false
    playPauseButton.html("Play")
  }

  // Load the new audio file
  audioFile = audioInput.elt.files[0]

  // Use p5.js loadSound with a callback approach
  if (audioFile) {
    // Clear existing sound object
    if (sound) {
      sound.dispose()
    }

    // Create a loading message
    console.log("Loading audio file...")

    // Use p5.js built-in loadSound function instead of manual decoding
    // This is more reliable than manually creating a SoundFile
    const fileUrl = URL.createObjectURL(audioFile)

    // Set up p5's sound context first to ensure it's ready
    if (getAudioContext().state !== "running") {
      getAudioContext().resume()
    }

    // Use the built-in p5.js loadSound function
    sound = loadSound(
      fileUrl,
      // Success callback
      () => {
        console.log("Sound loaded successfully!")
        fft.setInput(sound)
        // Release the blob URL after loading
        URL.revokeObjectURL(fileUrl)
      },
      // Error callback
      (err) => {
        console.error("Error loading sound:", err)
      }
    )
  }
}

// Particle class for the dynamic visualizer elements
class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(random(50, 250))
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.001))
    this.size = random(3, 8)
    this.baseSize = this.size
    this.angle = 0
  }

  update(amp) {
    // Add rotation
    this.angle += map(amp, 0, 255, 0, 3)

    // Dynamic size based on amplitude
    this.size = this.baseSize + map(amp, 0, 255, 0, 12)

    // Speed based on amplitude
    let ampFactor = map(amp, 0, 255, 0.05, 0.3)
    this.vel.add(this.acc.copy().mult(ampFactor))
    this.pos.add(this.vel)

    // Reset if too far
    if (this.pos.mag() > max(width, height) || this.pos.mag() < 10) {
      this.pos = p5.Vector.random2D().mult(random(50, 250))
      this.vel = createVector(0, 0)
    }
  }

  draw(color) {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)

    // Draw a little star/sparkle
    noStroke()
    fill(color[0], color[1], color[2], 150)
    ellipse(0, 0, this.size, this.size)
    fill(255, 255, 255, 100)
    ellipse(0, 0, this.size * 0.5, this.size * 0.5)
    pop()
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
