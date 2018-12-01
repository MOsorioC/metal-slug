class SpaceBackground extends GameObject {

  init() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.img.src = './assets/background_1.png';
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  }

  draw(){
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    //this.context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}
