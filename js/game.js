// - Audio -
const audio = document.getElementById('audio');
let audioActive = false;

// - Canvas Context -
const cnv = document.getElementById('cnv');
const ctx = cnv.getContext('2d');
const container = document.getElementsByClassName('canvas-container')[0];

const player = new Player();

// - Game Info -
const colorArray = ['#CD5251','#F1AD69','#40748A','#111','#F5F5F5'];
let currentColor = 0;
let currentStage = 0;
let objArray = [];
let noteArray = [];
let qCount = 0;
let spikeTimer = false;
let retro = false;

// - Functions -
function init() {
  reset();
  frameFunction();
};
function reset() {
  player.pos = dup(stages[currentStage].startingPosition);
  player.vx = 0;
  player.vy = 0;
  camera.pos = dup(stages[currentStage].cameraPosition);

  currentColor = stages[currentStage].startingColor;
  objArray = stages[currentStage].objects.map(props => new Object(props));
  noteArray = stages[currentStage].notes.map(props => new Note(props));
};

function frameFunction() {
  if (spikeTimer) {
    spikeTimer++;
    if (spikeTimer >= 60) {
      spikeTimer = false;
      reset();
    }
    requestAnimationFrame(frameFunction);
    return;
  }

  coverFrame();

  const off = (Math.floor(Math.random() * 22));
  const r = (Math.floor(Math.random() * ((off>=21)?16:3)) - ((off>=19)?5:2));

  // Draw objects that are the currentColor
  objArray.filter(obj => obj.color === currentColor).forEach(obj => obj.draw(r));

  // Player stuff
  player.updateMovement();
  player.updatePosition();

  // Collisions
  const shownObjects = objArray.filter(obj => obj.color !== currentColor);
  shownObjects.forEach(obj => player.collisionCheck(obj));

  // Camera movement
  camera.updatePosition();

  // Draw player
  player.draw();

  // Draw objects that are not the currentColor
  shownObjects.forEach(obj => obj.draw(r));

  // Draw Player Outline
  player.drawOutline();

  // Draw notes
  noteArray.forEach(note => note.draw());

  // Stage Title
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font="48px Quicksand";
  ctx.fillText(`Stage ${currentStage} - ${stages[currentStage].title}`,60,80);

  if (retro) {
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = (currentColor !== i) ? colorArray[i] : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 4;
      ctx.strokeRect(1120 + (80*i), 40, 50, 50);
    }
  }

  // Check for input from the user (e.g. pause, color switch, etc.)
  checkInput();

  // Next Frame
  requestAnimationFrame(frameFunction);
};

function coverFrame() {
  ctx.fillStyle = retro ? 'rgba(0,0,0,0.5)' : colorArray[currentColor];
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Dup object
function dup(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// - Go Time -
init();
