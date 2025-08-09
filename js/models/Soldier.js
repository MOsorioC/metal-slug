class Soldier extends GameObject {
  init() {
    // frame-based animation settings
    this.width = 35;
    this.height = 45;
    this.x = canvas.width;
    this.imgY = 46;
    this.imagePosition = 0;
    this.status = 'run';
    this.stop = 200;
    this.frameSpeedRun = 33; // source sprite advance
    this.frameSpeedStand = 33;
    this.img.src = './assets/soldier/soldier.png';
  }

  update(delta, frame) {
    // advance animation each frame
    if (this.status === 'run') {
      this.x -= (this.speed || 5); // dynamic speed
      this.imagePosition = (this.imagePosition + this.frameSpeedRun) % 300;
      if (this.x < this.stop) {
        this.status = 'stand';
        this.imgY = 0;
        this.imagePosition = 0;
      }
    } else if (this.status === 'stand' && frame % 4 === 0) {
      this.imagePosition = (this.imagePosition + this.frameSpeedStand);
      if (this.imagePosition > 100) this.imagePosition = 0;
    }
  }

  draw() {
    if (this.status === 'stand') {
      this.context.drawImage(this.img, this.imagePosition, this.imgY, 35, 45, this.x, this.canvas.height - 140, 50, 70);
    } else {
      this.context.drawImage(this.img, this.imagePosition, this.imgY, 32, 43, this.x, this.canvas.height - 140, 49, 70);
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
