class Shoot extends GameObject {
  init(positionX, positionY) {
    this.x = positionX;
    this.y = positionY;
    this.width = 10;
    this.height = 10;
    this.speed = 600; // px per second
    this.active = true;
  }

  update(delta) {
    if (!this.active) return;
    this.x += this.speed * delta;
    if (this.x > this.canvas.width + 40) {
      this.active = false; // auto deactivate
    }
  }

  draw() {
    if (!this.active) return;
  this.context.fillStyle = '#ffd200';
  this.context.fillRect(this.x, this.y, this.width+2, this.height+2);
  }

  activate(x,y) {
    // reuse bullet from pool
    this.x = x;
  this.y = y; // now direct draw without extra offset
    this.active = true;
  // optional: reset size if changed
  this.width = 10; this.height = 10;
  }
}
