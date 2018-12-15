class Shoot extends GameObject {
  init( positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
    this.intervalID = 0;
    this.draw();
  }

  draw() {
    this.intervalID = setInterval(() => {
      this.x += 1;
      this.context.fillStyle = "black";
      this.context.fillRect(this.x, this.y + 30, 10, 10);

      if(this.x > canvas.width) {
        this.stopShoot();
      }
    }, 0);
  }

  stopShoot() {
    clearInterval(this.intervalID);
  }
}
