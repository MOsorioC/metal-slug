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
    // sprite sheet horizontal advance (px of source)
    this.frameSpeedRun = 33;
    this.frameSpeedStand = 33;
    // timing (seconds per frame) - slowed down
    this.runFrameDuration = 0.18; // was effectively every frame
    this.standFrameDuration = 0.6;
    this.frameAccumulator = 0;
    this.img.src = './assets/soldier/soldier.png';
  }

  update(delta, frame) {
    // accumulate time for animation frames
    this.frameAccumulator += delta;

    if (this.status === 'run') {
      // Convert legacy small speed (value per frame) into px/s, then halve for slower motion
      const raw = (this.speed || 5); // legacy value intended per frame
      const pxPerSecond = raw * 60 * 0.5; // scale by 60fps assumption & slow by 50%
      this.x -= pxPerSecond * delta;

      // advance animation only when enough time elapsed (slower frame rate)
      while (this.frameAccumulator >= this.runFrameDuration) {
        this.imagePosition = (this.imagePosition + this.frameSpeedRun) % 300;
        this.frameAccumulator -= this.runFrameDuration;
      }

      if (this.x < this.stop) {
        this.status = 'stand';
        this.imgY = 0;
        this.imagePosition = 0;
        this.frameAccumulator = 0;
      }
    } else if (this.status === 'stand') {
      if (this.frameAccumulator >= this.standFrameDuration) {
        this.imagePosition += this.frameSpeedStand;
        if (this.imagePosition > 100) this.imagePosition = 0;
        this.frameAccumulator = 0;
      }
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
