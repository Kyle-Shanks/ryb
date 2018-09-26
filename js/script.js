// --- Notes ---
// ryb

document.addEventListener('DOMContentLoaded', () => {
  // --- Setup -----------------------------------------------
  // - Canvas Context -
  const cnv = document.getElementById('cnv');
  const ctx = cnv.getContext('2d');
  const container = document.getElementsByClassName('canvas-container')[0];
  // ---------------------------------------------------------

  // --- Input Handling --------------------------------------
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
      default: return false;
    }
  });
  // ---------------------------------------------------------

  // --- Player Class ----------------------------------------
  class Player {
    constructor() {
      // Size and position
      this.height = 36;
      this.width = 36;
      this.pos = { x: 0, y: 0 };
      this.onGround = false;
      // Movement
      this.gravity = 0.75;
      this.vx = 0;
      this.vy = 0;
      this.vxMax = 10;
      this.vyMax = 16;
      this.vxAcc = 0.6;
      this.vyAcc = 0.4;
      // Double Jumping
      this.doubleJumps = 1;
      this.maxDoubleJumps = 1;
      this.doubleJumpMod = 1;
    }

    updatePosition() {
      const height = cnv.height;
      const width = cnv.width;
      this.pos.x += this.vx;
      this.pos.y += this.vy;

      // Setting Outer Boundaries
      if( ((this.pos.x) < 0) || (this.pos.x > (width - this.width)) ) { this.vx = 0; }
      else if( ((this.pos.y) < 0) || (this.pos.y > (height - this.height)) ) { this.vy = 0; }

      if(this.pos.x < 0) { this.pos.x = 0; }
      else if((this.pos.x + this.width) > width) { this.pos.x = width - this.width; }
      if(this.pos.y < 0) { this.pos.y = 0; }
      else if((this.pos.y + this.height) > height) {
        this.pos.y = height - this.height;
        this.onGround = true;
        this.doubleJumps = this.maxDoubleJumps;
      }
    }

    updateMovement() {
      // X Movement
      this.vx += (input.D ? this.vxAcc : -(this.vxAcc)) + (input.A ? (-(this.vxAcc)) : this.vxAcc);
      if((!input.D && !input.A) || (input.D && input.A)) {
        if(this.vx < this.vxAcc && this.vx > -(this.vxAcc)) {this.vx = 0};
        if(this.vx < 0) {this.vx += this.vxAcc/1.8};
        if(this.vx > 0) {this.vx -= this.vxAcc/1.8};
      };
      if(this.vx > this.vxMax) {this.vx = this.vxMax};
      if(this.vx < -(this.vxMax)) {this.vx = -(this.vxMax)};

      // Y Movement
      // Gravity
      this.vy += this.gravity;

      // Jumping
      if (this.onGround && input.SPACE) {
        this.onGround = false;
        this.vy = -(this.vyMax);
        input.SPACE = false;
      }
      // Double Jumping
      if (!this.onGround && input.SPACE && this.doubleJumps) {
        this.vy = -(this.vyMax) * this.doubleJumpMod;
        input.SPACE = false;
        this.doubleJumps--;
      }

      if(this.vy > this.vyMax) {this.vy = this.vyMax};
      if(this.vy < -(this.vyMax)) {this.vy = -(this.vyMax)};
    }

    draw() {
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  const player = new Player();
  // ---------------------------------------------------------

  // --- Stage Data ------------------------------------------
  let currentStage = 0;
  const colorArray = ['#E91E63','#E9C65F','#00BCD4']; // ryb
  let currentColor = 0;
  // ---------------------------------------------------------

  // --- Player Input ----------------------------------------
  function checkInput() {
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
  }
  // ---------------------------------------------------------

  // --- Functions -------------------------------------------
  function init() {
    reset();
    frameFunction();
  };
  function reset() {
    // Reset/Initialize stuff
  };

  function frameFunction() {
    coverFrame();

    player.updateMovement();
    player.updatePosition();
    player.draw();

    checkInput();

    // Next Frame
    requestAnimationFrame(frameFunction);
  };

  function coverFrame() {
    // ctx.fillStyle = 'rgba(0,15,35,1)'; // change opacity for fade
    ctx.fillStyle = colorArray[currentColor];
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  // ---------------------------------------------------------

  init();
});
