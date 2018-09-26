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
      this.onGround = false;

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

      if(this.vy > this.vyMax) {this.vy = this.vyMax};
      if(this.vy < -(this.vyMax)) {this.vy = -(this.vyMax)};
    }

    collisionCheck(obj) {
      if(obj.color !== currentColor && AABB(this, obj)) {
        this.collisionHandler(obj);
      }
    }

    collisionHandler(obj) {
      // Y Collision
      if ((this.pos.y + this.height < obj.pos.y + this.vyMax + 1) && this.vy >= 0) {
        this.pos.y = obj.pos.y - this.height;
        this.vy = 0;
        this.onGround = true;
        this.doubleJumps = this.maxDoubleJumps;
      } else if ((this.pos.y > obj.pos.y + obj.height - this.vyMax - 1) && this.vy <= 0) {
        this.pos.y = obj.pos.y + obj.height;
        this.vy = 0;
      }

      // X Collision
      if ((this.pos.x + this.width < obj.pos.x + this.vxMax + 1) && this.vx >= 0) {
        this.pos.x = obj.pos.x - this.width;
        this.vx = 0;
        if (input.SPACE) {
          this.vy = this.vyMax * -1;
          this.vx = this.vxMax * -1;
          input.SPACE = false;
        }
      } else if ((this.pos.x > obj.pos.x + obj.width - this.vxMax - 1) && this.vx <= 0) {
        this.pos.x = obj.pos.x + obj.width;
        this.vx = 0;
        if (input.SPACE) {
          this.vy = this.vyMax * -1;
          this.vx = this.vxMax * 1;
          input.SPACE = false;
        }
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(this.pos.x+10,this.pos.y+10,this.width,this.height);
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  const player = new Player();
  // ---------------------------------------------------------

  // --- Object Class ----------------------------------------
  class Object {
    constructor(props) {
      this.pos = props.pos || { x: 0, y: 0 };
      this.height = props.height || 50;
      this.width = props.width || 50;
      this.color = props.color || 3;
    }

    draw() {
      if (this.color !== currentColor) {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(this.pos.x+10,this.pos.y+10,this.width,this.height);
      }
      ctx.fillStyle = colorArray[this.color];
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  const obj1 = new Object({
    pos: {x: 300, y: 700},
    height: 50,
    width: 400,
    color: 2,
  });
  const obj2 = new Object({
    pos: {x: 800, y: 400},
    height: 600,
    width: 50,
    color: 1,
  });
  // ---------------------------------------------------------

  // --- Stage Data ------------------------------------------
  let currentStage = 0;
  const colorArray = ['#E91E63','#E9C65F','#00BCD4','#000F23']; // ryb + black
  let currentColor = 0;
  // ---------------------------------------------------------

  // --- Player Input ----------------------------------------
  function checkInput() {
    // Jumping
    if (player.onGround && input.SPACE) {
      player.onGround = false;
      player.vy = -(player.vyMax);
      input.SPACE = false;
    }
    // Double Jumping
    if (!player.onGround && input.SPACE && player.doubleJumps) {
      player.vy = -(player.vyMax) * player.doubleJumpMod;
      input.SPACE = false;
      player.doubleJumps--;
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

    // Draw objects that are the currentColor
    if (obj1.color === currentColor) obj1.draw();
    if (obj2.color === currentColor) obj2.draw();

    // Player stuff
    player.updateMovement();
    player.updatePosition();

    player.collisionCheck(obj1);
    player.collisionCheck(obj2);

    player.draw();

    // Draw objects that are not the currentColor
    if (obj1.color !== currentColor) obj1.draw();
    if (obj2.color !== currentColor) obj2.draw();

    // Check for input from the user (e.g. pause, color switch, etc.)
    checkInput();

    // Next Frame
    requestAnimationFrame(frameFunction);
  };

  function coverFrame() {
    ctx.fillStyle = colorArray[currentColor];
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  // AABB-collision check
  function AABB(r1,r2) {
    return (r1.pos.x < r2.pos.x + r2.width && r1.pos.x + r1.width > r2.pos.x &&
            r1.pos.y < r2.pos.y + r2.height && r1.pos.y + r1.height > r2.pos.y);
  }
  // ---------------------------------------------------------

  init();
});
