// --- Notes ---
// ryb

document.addEventListener('DOMContentLoaded', () => {
  // - Canvas Context -
  const cnv = document.getElementById('cnv');
  const ctx = cnv.getContext('2d');
  const container = document.getElementsByClassName('canvas-container')[0];

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

  // - Player Class -
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
      if( ((this.pos.x) < 0) || (this.pos.x > (stages[currentStage].width - this.width)) ) { this.vx = 0; }
      else if( ((this.pos.y) < 0) || (this.pos.y > (stages[currentStage].height - this.height)) ) { this.vy = 0; }

      if(this.pos.x < 0) { this.pos.x = 0; }
      else if((this.pos.x + this.width) > stages[currentStage].width) { this.pos.x = stages[currentStage].width - this.width; }
      if(this.pos.y < 0) { this.pos.y = 0; }
      else if((this.pos.y + this.height) > stages[currentStage].height) {
        reset();
      }
    }

    updateMovement() {
      // X Movement
      this.vx += (input.D ? this.vxAcc : -(this.vxAcc)) + (input.A ? (-(this.vxAcc)) : this.vxAcc);
      if((!input.D && !input.A) || (input.D && input.A)) {
        if(this.vx < this.vxAcc && this.vx > -(this.vxAcc)) { this.vx = 0 };
        if(this.vx < 0) { this.vx += this.vxAcc/1.8 };
        if(this.vx > 0) { this.vx -= this.vxAcc/1.8 };
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
        switch(obj.type) {
          case 'solid': this.collisionHandler(obj); break;
          case 'port': currentStage = obj.stageNum; reset(); break;
        }
      }
    }

    collisionHandler(obj) {
      let yChange = false;
      // Y Collision
      if ((this.pos.y + this.height < obj.pos.y + this.vyMax + 1) && this.vy >= 0) {
        this.pos.y = obj.pos.y - this.height;
        this.vy = 0;
        this.onGround = true;
        this.doubleJumps = this.maxDoubleJumps;
        yChange = true;
      } else if ((this.pos.y > obj.pos.y + obj.height - this.vyMax - 1) && this.vy <= 0) {
        this.pos.y = obj.pos.y + obj.height;
        this.vy = 0;
      }

      // X Collision
      if ((this.pos.x + this.width < obj.pos.x + this.vxMax + 1) && this.vx >= 0 && !yChange) {
        this.pos.x = obj.pos.x - this.width;
        this.vx = 0;
      } else if ((this.pos.x > obj.pos.x + obj.width - this.vxMax - 1) && this.vx <= 0 && !yChange) {
        this.pos.x = obj.pos.x + obj.width;
        this.vx = 0;
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(this.pos.x - camera.pos.x + 10,this.pos.y - camera.pos.y + 10,this.width,this.height);
      ctx.fillStyle = 'rgba(245,245,245,1)';
      ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height);
    }
    drawOutline() {
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height);
    }
  }

  const player = new Player();

  // - Object Class -
  class Object {
    constructor(props) {
      this.pos = props.pos || { x: 0, y: 0 };
      this.height = props.height || 50;
      this.width = props.width || 50;
      this.color = props.color !== undefined ? props.color : 3;
      this.type = props.type || 'solid';
      this.stageNum = props.stageNum;
    }

    draw() {
      if (this.color !== currentColor) {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(this.pos.x - camera.pos.x + 10,this.pos.y - camera.pos.y + 10,this.width,this.height);
      }
      if (this.type === 'port') {
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 4;
        ctx.strokeRect(this.pos.x - camera.pos.x - 20, this.pos.y - camera.pos.y - 20, this.width + 40, this.height + 40);
      } else {
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height);
      }

      ctx.fillStyle = colorArray[this.color];
      ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height);
    }
  }

  // - Note Class -
  class Note {
    constructor(props) {
      this.pos = props.pos || { x: 0, y: 0 };
      this.msg = props.msg || '';
    }

    draw() {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font="30px Comfortaa";
      ctx.fillText(this.msg,this.pos.x - camera.pos.x,this.pos.y - camera.pos.y);
    }
  }

  // - Game Info -
  const colorArray = ['#CD5251','#F1AD69','#40748A','#111','#F5F5F5']; // subdued ryb + black + white
  // const colorArray = ['#dd6764','#81cb72','#5b94c4','#111','#F5F5F5']; // rgb + black + white
  // const colorArray = ['#dd6764','#e7c24c','#009e9a','#111','#F5F5F5']; // rgb + black + white

  let currentColor = 0;
  let currentStage = 0;
  let objArray = [];
  let noteArray = [];

  // - Camera -
  const camera = {
    pos: { x: 0, y: 0 },
    vxMax: 25,
    vyMax: 40,
    // Screen padding for camera movement
    xPad: 650,
    yPad: 350,
    updatePosition: function() {
      // Moving Right
      if((player.pos.x - this.pos.x) > (cnv.width - this.xPad)) {
        this.pos.x += Math.floor((((player.pos.x - this.pos.x) - (cnv.width - this.xPad))/this.xPad)*this.vxMax);
      }
      // Moving Left
      if((player.pos.x - this.pos.x) < (this.xPad)) {
        this.pos.x -= Math.floor(((this.xPad-(player.pos.x - this.pos.x))/this.xPad)*this.vxMax);
      }

      // Moving Up
      if((player.pos.y - this.pos.y) < (this.yPad)) {
        this.pos.y -= Math.floor(((this.yPad-(player.pos.y - this.pos.y))/this.yPad)*this.vyMax);
      }
      // Moving Down
      if((player.pos.y - this.pos.y) > (cnv.height - this.yPad)) {
        this.pos.y += Math.floor((((player.pos.y - this.pos.y) - (cnv.height - this.yPad))/this.yPad)*this.vyMax);
      }

      // Setting maxes based on stage size
      if(this.pos.x < 0) { this.pos.x = 0; }
      if(this.pos.y < 0) { this.pos.y = 0; }
      if(this.pos.x > stages[currentStage].width - cnv.width) { this.pos.x = stages[currentStage].width - cnv.width; }
      if(this.pos.y > stages[currentStage].height - cnv.height) { this.pos.y = stages[currentStage].height - cnv.height; }
    }
};

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
      reset();
    }
  }

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
    coverFrame();

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font="48px Comfortaa";
    ctx.fillText(stages[currentStage].title,40,80);

    // Draw objects that are the currentColor
    objArray.filter(obj => obj.color === currentColor).forEach(obj => obj.draw());

    // Player stuff
    player.updateMovement();
    player.updatePosition();

    // Collisions
    const shownObjects = objArray.filter(obj => obj.color !== currentColor);
    shownObjects.forEach(obj => player.collisionCheck(obj));

    // Camera movement
    camera.updatePosition();

    // Drawing
    noteArray.forEach(note => note.draw());
    player.draw();

    // Draw objects that are not the currentColor
    shownObjects.forEach(obj => obj.draw());

    // Draw Player Outline
    player.drawOutline();

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

  // Dup object
  function dup(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // - Go Time -
  init();
});
