// - Keyboard Inputs -
const input = {
  W: false,
  A: false,
  S: false,
  D: false,
  UP: false,
  RIGHT: false,
  DOWN: false,
  LEFT: false,
  SPACE: false,
  SHIFT: false,
  Q: false,
  E: false,
  R: false,
  F: false
};

document.addEventListener('keydown', e => {
  e.preventDefault();
  if (!audioActive) {
    audioActive = true;
    audio.play();
  }
  const key = e.keyCode;
  switch(key) {
    case 87: input.W = true; break;     // W
    case 65: input.A = true; break;     // A
    case 83: input.S = true; break;     // S
    case 68: input.D = true; break;     // D
    case 37: input.LEFT = true; break;  // Left
    case 38: input.UP = true; break;    // Up
    case 39: input.RIGHT = true; break; // Right
    case 40: input.DOWN = true; break;  // Down
    case 32: input.SPACE = true; break; // Space
    case 16: input.SHIFT = true; break; // Shift
    case 81: input.Q = true; break;     // Q
    case 69: input.E = true; break;     // E
    case 82: input.R = true; break;     // R
    case 70: input.F = true; break;     // F
    case 77: input.M = true; break;     // M
    default: return false;
  }
});
document.addEventListener('keyup', e => {
  const key = e.keyCode;
  switch(key) {
    case 87: input.W = false; break;     // W
    case 65: input.A = false; break;     // A
    case 83: input.S = false; break;     // S
    case 68: input.D = false; break;     // D
    case 37: input.LEFT = false; break;  // Left
    case 38: input.UP = false; break;    // Up
    case 39: input.RIGHT = false; break; // Right
    case 40: input.DOWN = false; break;  // Down
    case 32: input.SPACE = false; break; // Space
    case 16: input.SHIFT = false; break; // Shift
    case 81: input.Q = false; break;     // Q
    case 69: input.E = false; break;     // E
    case 82: input.R = false; break;     // R
    case 70: input.F = false; break;     // F
    case 77: input.M = false; break;      // M
    default: return false;
  }
});

// - Player Input -
function checkInput() {
  // Jumping
  if (player.onGround && input.SPACE) {
    player.onGround = false;
    player.vy = -(player.vyMax);
    input.SPACE = false;
  }

  // Wall Jumping / Double Jumping
  if (!player.onGround && input.SPACE) {
    const filteredObjects = stages[currentStage].objects.filter(obj => {
      return (
        obj.color !== currentColor &&
        !(player.pos.y >= obj.pos.y + obj.height || player.pos.y + player.height <= obj.pos.y)
      );
    });

    if (filteredObjects.some(obj => obj.pos.x + obj.width === player.pos.x)) {
      player.vy = player.vyMax * -1;
      player.vx = player.vxMax * 1;
    } else if (filteredObjects.some(obj => obj.pos.x === player.pos.x + player.width)) {
      player.vy = player.vyMax * -1;
      player.vx = player.vxMax * -1;
    } else if (player.doubleJumps) {
      player.vy = -(player.vyMax) * player.doubleJumpMod;
      player.doubleJumps--;
    }
    input.SPACE = false;
  }

  // Color Switching
  if (input.LEFT) {
    input.LEFT = false;
    currentColor = 0;
  } else if (input.UP || input.DOWN) {
    input.UP = false;
    input.DOWN = false;
    currentColor = 1;
  } else if (input.RIGHT) {
    input.RIGHT = false;
    currentColor = 2;
  }

  // Reset
  if (input.R) {
    input.R = false;
    if (retro) {
      qCount = 0;
      retro = false;
      const time = audio.currentTime;
      audio.src = "assets/audio/ryb.wav";
      audio.play();
      audio.currentTime = time;
    } else {
      reset();
    }
  }

  // Retro
  if (input.Q) {
    input.Q = false;
    if (!retro) {
      qCount++;
      if(qCount >= 10) {
        retro = true;
        const time = Number(audio.currentTime);
        audio.src = "assets/audio/ryb_crush.wav";
        audio.play();
        audio.currentTime = time;
      }
    }
  }

  // Mute
  if (input.M) {
    input.M = false;
    audio.paused ? audio.play() : audio.pause();
  }
}
