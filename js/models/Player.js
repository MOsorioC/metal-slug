class Player extends GameObject {
  init() {
    this.width = 400;
    this.height = 600;

    this.img.src = './assets/marco/marco.jpg';
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  }

  draw(){
    this.context.drawImage(this.img, this.x + 30,this.y,35,40,20,this.canvas.height - 140,50,70);
    //this.context.drawImage(this.img, this.x,this.y,35,40,200,this.canvas.height - 140,50,70);
    //this.context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
  }
}
