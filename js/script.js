// --- Notes ---
// ryb

document.addEventListener('DOMContentLoaded', () => {
  // - Audio -
  const audio = document.getElementById('audio');
  let audioActive = false;

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
          case 'solid':
            this.collisionHandler(obj);
            break;
          case 'port':
            obj.stageNum !== undefined ? (currentStage = obj.stageNum) : currentStage++;
            reset();
            break;
          case 'spikes':
            // reset();
            spikeTimer = true;
            break;
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
      if (retro) return;
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(this.pos.x - camera.pos.x + 10,this.pos.y - camera.pos.y + 10,this.width,this.height);
      ctx.fillStyle = 'rgba(245,245,245,1)';
      ctx.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height);
    }
    drawOutline() {
      ctx.strokeStyle = retro ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)';
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
      this.dir = props.dir;
    }

    draw(r) {
      if (retro) {
        if (this.type === 'port') {
          ctx.strokeStyle = 'rgba(255,255,255,1)';
          ctx.lineWidth = 1;
          ctx.strokeRect(this.pos.x - camera.pos.x - 20 + r, this.pos.y - camera.pos.y - 20 + r, this.width + 40, this.height + 40);
        }

        if (this.type === 'spikes' && this.color !== currentColor) {
          let sNum;
          (this.dir % 2) ? sNum = this.height/50 : sNum = this.width/50;
          ctx.strokeStyle = this.color === 3 ? 'rgba(150,150,150,1)' : colorArray[this.color];
          ctx.beginPath();
          ctx.moveTo(
            this.pos.x - camera.pos.x + (this.dir === 1 ? 50 : 0) + (r),
            this.pos.y - camera.pos.y + (this.dir === 0 ? 50 : 0) + (r)
          );
          if (this.dir % 2) {
            for(let i = 0; i < sNum; i++) {
              ctx.lineTo(
                this.pos.x + ((this.dir === 1 ? -1 : 1) * 50 * ((i+1)%2))
                - camera.pos.x + (this.dir === 1 ? 50 : 0) + (r),
                this.pos.y + (50*(i+1)) - camera.pos.y + (r)
              );
            }
          } else {
            for(let i = 0; i < sNum; i++) {
              ctx.lineTo(
                this.pos.x + (50*(i+1)) - camera.pos.x + (r),
                this.pos.y + ((this.dir === 0 ? -1 : 1) * 50 * ((i+1)%2))
                - camera.pos.y + (this.dir === 0 ? 50 : 0) + (r)
              );
            }
          }
          ctx.stroke();
          return;
        }

        if (this.color === 3) {
          ctx.strokeStyle = 'rgba(150,150,150,1)';
          ctx.lineWidth = 4;
          ctx.strokeRect(this.pos.x - camera.pos.x + (r), this.pos.y - camera.pos.y + (r), this.width, this.height);
        } else if (this.color !== currentColor) {
          ctx.strokeStyle = colorArray[this.color];
          ctx.lineWidth = 4;
          ctx.strokeRect(this.pos.x - camera.pos.x + (r), this.pos.y - camera.pos.y + (r), this.width, this.height);
        }
        return;
      }

      if (this.type === 'spikes') {
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 2;
        let sNum;
        (this.dir % 2) ? sNum = this.height/50 : sNum = this.width/50;

        // Shadow
        if (this.color !== currentColor) {
          ctx.beginPath();
          ctx.moveTo(
            this.pos.x + 10 - camera.pos.x + (this.dir === 1 ? 50 : 0),
            this.pos.y + 10 - camera.pos.y + (this.dir === 0 ? 50 : 0)
          );
          if (this.dir % 2) {
            for(let i = 0; i < sNum; i++) {
              ctx.lineTo(
                this.pos.x + 10 + ((this.dir === 1 ? -1 : 1) * 50 * ((i+1)%2))
                - camera.pos.x + (this.dir === 1 ? 50 : 0),
                this.pos.y + 10 + (50*(i+1)) - camera.pos.y
              );
            }
          } else {
            for(let i = 0; i < sNum; i++) {
              ctx.lineTo(
                this.pos.x + 10 + (50*(i+1)) - camera.pos.x,
                this.pos.y + 10 + ((this.dir === 0 ? -1 : 1) * 50 * ((i+1)%2))
                - camera.pos.y + (this.dir === 0 ? 50 : 0)
              );
            }
          }
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.moveTo(
          this.pos.x - camera.pos.x + (this.dir === 1 ? 50 : 0),
          this.pos.y - camera.pos.y + (this.dir === 0 ? 50 : 0)
        );
        if (this.dir % 2) {
          for(let i = 0; i < sNum; i++) {
            ctx.lineTo(
              this.pos.x + ((this.dir === 1 ? -1 : 1) * 50 * ((i+1)%2))
              - camera.pos.x + (this.dir === 1 ? 50 : 0),
              this.pos.y + (50*(i+1)) - camera.pos.y
            );
          }
        } else {
          for(let i = 0; i < sNum; i++) {
            ctx.lineTo(
              this.pos.x + (50*(i+1)) - camera.pos.x,
              this.pos.y + ((this.dir === 0 ? -1 : 1) * 50 * ((i+1)%2))
              - camera.pos.y + (this.dir === 0 ? 50 : 0)
            );
          }
        }
        ctx.stroke();
        ctx.fillStyle = colorArray[this.color];
        ctx.fill();
        return;
      }

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
      this.size = props.size || 30;
    }

    draw() {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font=`${this.size}px Quicksand`;
      ctx.fillText(this.msg,this.pos.x - camera.pos.x,this.pos.y - camera.pos.y);
    }
  }

  // - Game Info -
  const colorArray = ['#CD5251','#F1AD69','#40748A','#111','#F5F5F5'];
  let currentColor = 0;
  let currentStage = 12;
  let objArray = [];
  let noteArray = [];
  let qCount = 0;
  let spikeTimer = false;
  let retro = false;

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
