const INITIAL_VOLUME = 0.5
const AUDIO_FILE = "../../assets/rainbow.mp3"

let song
let btnPlay
let btnStop
let sliderPan
let sliderRate
let sliderVolume

function setup() {
  song = loadSound(AUDIO_FILE, onLoad)
  btnPlay = createButton("Play")
  btnPlay.mousePressed(onPlayClick)
  btnStop = createButton("Stop")
  btnStop.mousePressed(onStopClick)
  sliderPan = createSlider(-1, 1, 0, 0.01)
  sliderRate = createSlider(0, 3, 1, 0.01)
  sliderVolume = createSlider(0, 1, INITIAL_VOLUME, 0.01)
}

function draw() {
  song.pan(sliderPan.value())
  song.rate(sliderRate.value())
  song.setVolume(sliderVolume.value())
}

function onLoad() {
  console.log("song loaded")
}

function onPlayClick() {
  if (song.isPlaying()) {
    song.pause()
    btnPlay.html("Play")
  } else {
    // song.play()
    song.loop()
    btnPlay.html("Pause")
  }
}

function onStopClick() {
  song.stop()
  btnPlay.html("Play")
}
