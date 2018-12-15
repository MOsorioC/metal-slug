class Shoot extends GameObject {
  init( positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
    this.intervalID = 0;
    this.draw();
  }

  draw() {
      this.x += 10;
      this.context.fillStyle = "black";
      this.context.fillRect(this.x, this.y + 30, 10, 10);
  }
  
}
