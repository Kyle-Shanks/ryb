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

// AABB-collision check
function AABB(r1,r2) {
  return (r1.pos.x < r2.pos.x + r2.width && r1.pos.x + r1.width > r2.pos.x &&
          r1.pos.y < r2.pos.y + r2.height && r1.pos.y + r1.height > r2.pos.y);
}
