class Explosion extends GameObject {
  init(x, y) {
    this.x = x;
    this.y = y;
    this.life = 0.25; // seconds
    this.elapsed = 0;
    this.maxRadius = 35;
  }

  update(delta) {
    this.elapsed += delta;
  }

  draw() {
    if (this.elapsed > this.life) return;
    const t = this.elapsed / this.life; // 0 -> 1
    const alpha = 1 - t;
    const radius = 10 + t * this.maxRadius;
    this.context.save();
    this.context.globalAlpha = alpha;
    this.context.fillStyle = '#FFA500';
    this.context.beginPath();
    this.context.arc(this.x + 25, this.y + 35, radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.fillStyle = '#FFFF99';
    this.context.beginPath();
    this.context.arc(this.x + 25, this.y + 35, radius * 0.5, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  }

  isAlive() {
    return this.elapsed < this.life;
  }
}
