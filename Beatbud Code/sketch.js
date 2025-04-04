let sounds = {};
let currentSound = [];
let loopingSounds = []; // To store multiple loops
let soundStates = [];  // To store sound states for undo 
let amp;
let cols, rows;
let size = 40; // Define the size of each grid cell
let cnv; //to define a canvas variable 

//to implement recording functionalities 
let soundRecorder, soundFile, state = 0; //0 = not recording, 1= recording, 2= record complete

function setup() {
  cnv = createCanvas(600, 600); // Make canvas full screen
  cnv.parent("sketch-container");
  amp = new p5.Amplitude(); // Track amplitude of sound

  cols = width / size;
  rows = height / size;

  // Initialize Sound Recorder and Sound File
  soundRecorder = new p5.SoundRecorder();
  soundFile = new p5.SoundFile();

  // Connect the recorder to p5's output (captures all sounds played)
  soundRecorder.setInput();

  console.log("Recorder initialized:", soundRecorder);
  console.log("Sound file initialized:", soundFile);
  loadSounds();
}

// Load sound samples
function loadSounds() {

  sounds.brass_sfx = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/brassfx.mp3');

  sounds.coin_sfx = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/coinsfx.mp3');

  sounds.orchestral_sfx = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/orchestralsfx.mp3');

  sounds.sfx4 =
    loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/sfx4.mp3');

  sounds.sfx5 =
    loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/sfx5.mp3');

  sounds.sfx6 =
    loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/sfx6.mp3');

  sounds.sfx7 =
    loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/sfx7.mp3');

  sounds.kick = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/kick.mp3');

  sounds.kick2 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/kick2.mp3');

  sounds.kick3 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/kick3.mp3');

  sounds.kick4 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/kick4.mp3');

  sounds.kick5 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/kick5.mp3');

  sounds.snare = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/snare.mp3');

  sounds.snare2 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/snare2.mp3');

  sounds.snare3 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/snare3.mp3');

  sounds.snare4 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/snare4.mp3');

  sounds.meme = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/meme.mp3');

  sounds.meme2 = loadSound('https://raw.githubusercontent.com/sannieisegg/visualiser-project-/main/sounds/meme2.mp3');
}


function draw() {
  background(0, 0, 0);

  let vol = amp.getLevel(); // Get sound amplitude
  let scaleFactor = map(vol, 0, 1, 1, 3); // Scale circles based on amplitude

  //defining gradient colors (light blue > white)
  let color1 = color(173, 216, 230); //white
  let color2 = color(255, 255, 255); //white
  let gradientColor = lerpColor(color1, color2, vol);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * size + size / 2;
      let y = j * size + size / 2;
      let circleSize = size * scaleFactor; // Scale circle size

      fill(gradientColor);
      noStroke();
      ellipse(x, y, circleSize, circleSize);
    }
  }

  // Adjust volume & rate
  for (let key in sounds) {
    if (sounds[key].isPlaying()) {
      sounds[key].rate(sliderRate.value());
      sounds[key].setVolume(sliderVolume.value());
    }
  }

  // Update slider background
  let sliderValue = sliderVolume.value();
  let fillPercentage = map(sliderValue, 0, 1, 0, 100);
  let bgGradient = `linear-gradient(to right, red ${fillPercentage}%, white ${fillPercentage}%)`;
  document.querySelector('.volume-slider').style.background = bgGradient;

}

function keyPressed() {
  const soundKeys = {
    'A': 'kick', 'S': 'kick2', 'D': 'kick3', 'F': 'kick4', 'G': 'kick5',
    'H': 'snare', 'J': 'snare2', 'K': 'snare3', 'L': 'snare4',
    'Q': 'orchestral_sfx', 'W': 'coin_sfx', 'E': 'brass_sfx', 'R': 'sfx4',
    'T': 'sfx5', 'Y': 'sfx6', 'U': 'sfx7', 'I': 'meme', 'O': 'meme2'
  };

  const sound = soundKeys[key.toUpperCase()];
  if (sound && sounds[sound]) {
    currentSound = sounds[sound];
    currentSound.play();
  }
}

//to start recording 
// To start recording
function startRecording() {
  if (state === 0) {
    alert("Recording started...");
    if (soundRecorder && soundFile) {
      soundRecorder.record(soundFile);
      state = 1; // Change state to recording
    } else {
      alert("Sound recorder or sound file not initialized!");
    }
  }
}

// Function to stop recording and allow download
function stopRecording() {
  if (state === 1) {
    alert("Recording stopped!");
    soundRecorder.stop();
    state = 2; // Change state to recorded

    // Wait for the soundFile to be processed and check if it's valid
    setTimeout(() => {
      if (soundFile && soundFile.duration() > 0) {
        alert("Saving sound file...");
        saveSound(soundFile, 'beatbud_recording.wav');
      } else {
        alert("No sound recorded or soundFile is empty!");
      }
    }, 1000); // Add a delay to ensure the file is processed properly before saving

    // Reset the state after saving
    state = 0;
  }
}
