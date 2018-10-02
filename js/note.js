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
