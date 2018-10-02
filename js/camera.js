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
