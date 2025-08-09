class Shoot extends GameObject {
  init(positionX, positionY, dir = 1) {
    this.x = positionX;
    this.y = positionY;
    this.width = 10;
    this.height = 10;
    this.speed = 600; // px per second
    this.active = true;
    this.dir = dir; // 1 right, -1 left
  }

  update(delta) {
    if (!this.active) return;
    this.x += this.speed * this.dir * delta;
    if (this.x > this.canvas.width + 40 || this.x < -40) {
      this.active = false; // auto deactivate
    }
  }

  draw() {
    if (!this.active) return;
  this.context.fillStyle = '#ffd200';
  this.context.fillRect(this.x, this.y, this.width+2, this.height+2);
  }

  activate(x,y, dir = 1) {
    // reuse bullet from pool
    this.x = x;
  this.y = y; // now direct draw without extra offset
    this.active = true;
    this.dir = dir;
  // optional: reset size if changed
  this.width = 10; this.height = 10;
  }
}
