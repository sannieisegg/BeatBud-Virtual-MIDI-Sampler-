let sounds = {};
let currentSound = [];
let loopingSounds = []; // To store multiple loops
let soundStates = [];  // To store sound states for undo 
let amp;
let cols, rows;
let size = 40; // Define the size of each grid cell
let cnv; //to define a canvas variable 

//to implement recording functionalities 
let soundRecorder;
let soundFile;
let state = 0; //0 = not recording, 1= recording, 2= record complete

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

  // Load sound samples
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
  //for the kick samples 
  if (key.toUpperCase() === 'A' && sounds.kick) {
    currentSound = sounds.kick;
    currentSound.play();
  } else if (key.toUpperCase() === 'S' && sounds.kick2) {
    currentSound = sounds.kick2;
    currentSound.play();
  } else if (key.toUpperCase() === 'D' && sounds.kick3) {
    currentSound = sounds.kick3;
    currentSound.play();
  } else if (key.toUpperCase() === 'F' && sounds.kick4) {
    currentSound = sounds.kick4;
    currentSound.play();
  } else if (key.toUpperCase() === 'G' && sounds.kick5) {
    currentSound = sounds.kick5;
    currentSound.play();

    //for the snare samples
  } else if (key.toUpperCase() === 'H' && sounds.snare) {
    currentSound = sounds.snare;
    currentSound.play();
  } else if (key.toUpperCase() === 'J' && sounds.snare2) {
    currentSound = sounds.snare2;
    currentSound.play();
  } else if (key.toUpperCase() === 'K' && sounds.snare3) {
    currentSound = sounds.snare3;
    currentSound.play();
  } else if (key.toUpperCase() === 'L' && sounds.snare4) {
    currentSound = sounds.snare4;
    currentSound.play();


    //for the sfx samples (including memes eheh)
  } else if (key.toUpperCase() === 'Q' && sounds.orchestral_sfx) {
    currentSound = sounds.orchestral_sfx;
    currentSound.play();
  } else if (key.toUpperCase() === 'W' && sounds.coin_sfx) {
    currentSound = sounds.coin_sfx;
    currentSound.play();
  } else if (key.toUpperCase() === 'E' && sounds.brass_sfx) {
    currentSound = sounds.brass_sfx;
    currentSound.play();
  } else if (key.toUpperCase() === 'R' && sounds.sfx4) {
    currentSound = sounds.sfx4;
    currentSound.play();
  } else if (key.toUpperCase() === 'T' && sounds.sfx5) {
    currentSound = sounds.sfx5;
    currentSound.play();
  } else if (key.toUpperCase() === 'Y' && sounds.sfx6) {
    currentSound = sounds.sfx6;
    currentSound.play();
  } else if (key.toUpperCase() === 'U' && sounds.sfx7) {
    currentSound = sounds.sfx7;
    currentSound.play();
  } else if (key.toUpperCase() === 'I' && sounds.meme) {
    currentSound = sounds.meme;
    currentSound.play();
  } else if (key.toUpperCase() === 'O' && sounds.meme2) {
    currentSound = sounds.meme2;
    currentSound.play();
  }
}

//to start recording 
function startRecording() {
  if (state === 0) {
    console.log("Recording started...");
    if (soundRecorder && soundFile) {
      soundRecorder.record(soundFile);
      state = 1; // Change state to recording
    } else {
      console.error("Sound recorder or sound file not initialized!");
    }
  }
}


// Function to stop recording and allow download
function stopRecording() {
  if (state === 1) {
    console.log("Recording stopped!");
    soundRecorder.stop();
    state = 2; // Change state to recorded
  }

  // Check if soundFile has valid data
  console.log("Checking soundFile before saving:", soundFile);

  if (state === 2 && soundFile) {
    try {
      saveSound(soundFile, 'beatbud_recording.wav');
      state = 0; // Reset state
    } catch (err) {
      console.error("Error saving sound file:", err);
    }
  } else {
    console.error("No sound recorded or soundFile is null!");
  }
}