class SpaceBackground extends GameObject {

  init() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.img.src = './assets/background_1.png';
    this.timer = 59;
    this.img.onload = function(){
      this.draw();
    }.bind(this);

    this.imgNumber = './assets/extras/numbers.png';
    this.img.onload = function(){
    }.bind(this);
  }

  draw() {
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    //this.context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }

  drawTimer() {

  }
}
