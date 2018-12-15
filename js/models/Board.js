class Board {
  constructor() {
    this.y = 0;
    this.x = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = './assets/background_1.png';
    this.img.onload = function() {
      //this.draw();
    }.bind(this);

  }

  draw(){
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    //context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
  }
}
