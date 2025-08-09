class RebelSoldier extends GameObject {
  init() {
    this.width = 40;
    this.height = 45;
    this.x = this.canvas.width + 200;
    this.imgY = 42;
    this.imagePosition = 450;
    this.status = 'run';
    this.stop = 600;
    this.frameStep = 41;
    this.img.src = './assets/soldier/rebel.png';
  }

  update(delta, frame) {
    if (this.status === 'run') {
      this.x -= (this.speed || 5);
      this.imagePosition -= this.frameStep;
      if (this.imagePosition <= 0) this.imagePosition = 450;
      if (this.x < this.stop) {
        this.status = 'stand';
        this.imgY = 0;
        this.imagePosition = 12;
      }
    } else if (this.status === 'stand' && frame % 4 === 0) {
      this.imagePosition += this.frameStep;
      if (this.imagePosition > 140) this.imagePosition = 12;
    }
  }

  draw() {
    if (this.status === 'stand') {
      this.context.drawImage(this.img, this.imagePosition - 4, this.imgY, 40, 45, this.x, this.canvas.height - 140, 50, 70);
    } else {
      this.context.drawImage(this.img, this.imagePosition, this.imgY, 40, 43, this.x, this.canvas.height - 140, 55, 75);
    }
  }

  isTouching(shot) {
    const top = this.canvas.height - 140;
    const bottom = top + this.height;
    return (
      this.x < shot.x + shot.width &&
      this.x + this.width > shot.x &&
      top < (shot.y + shot.height) &&
      bottom > shot.y
    );
  }
}
