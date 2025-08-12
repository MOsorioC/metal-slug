class Shoot extends GameObject {
  init(positionX, positionY, dir = 1) {
    this.x = positionX;
    this.y = positionY;
    this.width = 10;
    this.height = 10;
    this.speed = 600; // px per second
    this.active = true;
    this.dir = dir; // 1 right, -1 left
  this.trail = [];
  this.trailMax = 8; // number of ghost positions
  }

  update(delta) {
    if (!this.active) return;
    // record current position (center) before moving
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    this.trail.push({x: cx, y: cy});
    if (this.trail.length > this.trailMax) this.trail.shift();
    this.x += this.speed * this.dir * delta;
    if (this.x > this.canvas.width + 40 || this.x < -40) {
      this.active = false; // auto deactivate
      this.trail.length = 0;
    }
  }

  draw() {
    if (!this.active) return;
  const ctx = this.context;
  const r = Math.max(this.width, this.height) / 2; // radius based on size
    // draw trail (oldest first with lowest alpha)
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      const tAlpha = (i+1) / this.trail.length * 0.4; // fade up to 0.4
      const tScale = (i+1) / this.trail.length; // smaller near origin
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,210,0,${tAlpha.toFixed(3)})`;
      ctx.arc(p.x, p.y, r * tScale, 0, Math.PI * 2);
      ctx.fill();
    }
    // core projectile brighter
    ctx.beginPath();
    ctx.fillStyle = '#ffd200';
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, r, 0, Math.PI * 2);
    ctx.fill();
  }

  activate(x,y, dir = 1) {
    // reuse bullet from pool
    this.x = x;
  this.y = y; // now direct draw without extra offset
    this.active = true;
    this.dir = dir;
  // optional: reset size if changed
  this.width = 10; this.height = 10;
  if (!this.trail) this.trail = [];
  this.trail.length = 0; // reset trail
  }
}
