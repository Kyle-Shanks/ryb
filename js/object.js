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
