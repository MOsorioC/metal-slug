class Player extends GameObject {
  constructor(type) {
    super();
    this.type = type; // 'marco' | 'tarma'
    this.spritePath = `./assets/${type}/${type}.png`;
    this.img.src = this.spritePath;
    this.status = 'stand';
    this.imagePosition = 5;
    this.imgY = 0;
    this.frameAccumulator = 0; // for timing inside requestAnimationFrame
    this.groundY = this.canvas.height - 150;
    this.y = this.groundY;
    this.x = type === 'marco' ? 50 : 80; // initial offset difference
    this.width = 35; // frame width (source)
    this.height = 52; // frame height (source)
    this.vx = 0;
    this.vy = 0;
  this.gravity = 800; // px/s^2 (slightly less for smoother arc)
  this.jumpSpeed = 420; // initial vy (lower for visible jump)
    this.shootCooldown = 0; // seconds
  this.muzzleOffsetX = 65;
  this.muzzleOffsetY = 30; // vertical offset so bullet appears lower (hand level)
  }

  init() {
    // Reset to default starting state (mirrors constructor baseline)
    this.status = 'stand';
    this.imagePosition = 5;
    this.imgY = 0;
    this.vx = 0;
    this.vy = 0;
    this.y = this.groundY;
    // ensure sprite path (in case of reload or asset swap)
    if (!this.img.src.includes(this.spritePath)) {
      this.img.src = this.spritePath;
    }
    return this;
  }

  startRun() {
    if (this.status !== 'run') {
      this.status = 'run';
      this.imgY = 280;
      this.imagePosition = -22;
  this.frameAccumulator = 0;
    }
  }

  startJump() {
    if (this.status === 'jump') return;
    this.status = 'jump';
    this.imgY = 225;
    this.imagePosition = 8;
    this.vy = -this.jumpSpeed; // upward
  this.frameAccumulator = 0;
  console.log('[DEBUG] jump start vy', this.vy);
  }

  startShooting() {
    if (this.status === 'shooting' || this.shootCooldown > 0) return;
    this.status = 'shooting';
    this.imgY = 155;
    this.imagePosition = 450;
    this.shootCooldown = 0.25; // quarter second before allowing another trigger
  this.frameAccumulator = 0;
  }

  stand() {
    if (this.status !== 'stand') {
      this.status = 'stand';
      this.imgY = 0;
      this.imagePosition = 5;
      this.vx = 0;
  this.frameAccumulator = 0;
    }
  }

  fire(shotsArray) {
    const { offsetX, offsetY } = this.getMuzzleOffset();
    // Preferred: use global state.bulletPool if available
    if (typeof state !== 'undefined' && state.bulletPool) {
      const pool = state.bulletPool;
      const bullet = pool.find(b => !b.active);
      if (bullet) {
        bullet.activate(this.x + offsetX, this.y + offsetY);
        bullet.owner = this.type;
      } else {
        const extra = new Shoot(); extra.init(this.x + offsetX, this.y + offsetY); extra.owner = this.type; pool.push(extra);
      }
    } else if (typeof bulletPool !== 'undefined') {
      // compatibility global
      const bullet = bulletPool.find(b => !b.active);
      if (bullet) {
        bullet.activate(this.x + offsetX, this.y + offsetY);
        bullet.owner = this.type;
      } else {
        const extra = new Shoot(); extra.init(this.x + offsetX, this.y + offsetY); extra.owner = this.type; bulletPool.push(extra);
      }
    } else {
      // final fallback legacy array passed in
      const shot = new Shoot(); shot.init(this.x + offsetX, this.y + offsetY); shotsArray && shotsArray.push(shot);
    }
  console.log('[DEBUG] fire called type', this.type);
  this.startShooting();
  }

  getMuzzleOffset() {
    // Could vary by status/animation frame; keep simple for now
    return { offsetX: this.muzzleOffsetX, offsetY: this.muzzleOffsetY };
  }

  update(delta, globalFrame) {
    if (this.shootCooldown > 0) this.shootCooldown = Math.max(0, this.shootCooldown - delta);
    // Use delta-based accumulator for smoother animation
    this.frameAccumulator += delta;
  const runFrameTime = 0.15; // slower animation
  const shootFrameTime = 0.09;
  const idleFrameTime = 0.5;

    if (this.status === 'run') {
      // movement speed 240px/s
  this.x = Math.min(this.x + 180 * delta, this.canvas.width - 60); // slower run speed
      while (this.frameAccumulator >= runFrameTime) {
        this.advanceRunFrame();
        this.frameAccumulator -= runFrameTime;
      }
    } else if (this.status === 'shooting') {
      while (this.frameAccumulator >= shootFrameTime) {
        this.advanceShootFrame();
        this.frameAccumulator -= shootFrameTime;
      }
    } else if (this.status === 'stand') {
      if (this.frameAccumulator >= idleFrameTime) {
        if (this.imagePosition < 100) this.imagePosition += 35; else this.imagePosition = 5;
        this.frameAccumulator = 0;
      }
    }

    // Apply vertical physics whenever not on ground (airborne) regardless of current status
    if (this.y < this.groundY || this.vy !== 0 || this.status === 'jump') {
      this.applyJump(delta);
    }
  }

  applyJump(delta) {
    // integrate velocity first for immediate visual change
    this.vy += this.gravity * delta; // gravity
    this.y += this.vy * delta;
    if (this.y < this.groundY - 180) { // cap jump height
      this.y = this.groundY - 180;
      if (this.vy < 0) this.vy = 0; // start falling
    }
  // clamp floor
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
      // End of airborne: only force stand if current status is pure jump
      if (this.status === 'jump') {
        this.status = 'stand';
        this.imgY = 0;
        this.imagePosition = 5;
        this.frameAccumulator = 0;
        console.log('[DEBUG] landed');
      }
    }
  }

  advanceRunFrame() {
    if (this.imagePosition < 10) {
      this.imagePosition = 10;
    } else if (this.imagePosition < 100) {
      this.imagePosition += 32;
    } else if (this.imagePosition < 170) {
      this.imagePosition += 30;
    } else if (this.imagePosition < 230) {
      this.imagePosition += 32;
    } else {
      this.imagePosition = -22; // loop
    }
  }

  advanceShootFrame() {
    if (this.imagePosition < 450) {
      this.imagePosition = 450;
    } else if (this.imagePosition < 600) {
      this.imagePosition += 55;
    } else if (this.imagePosition < 750) {
      this.imagePosition += 42;
    } else if (this.imagePosition < 790) {
      this.imagePosition += 42;
    } else {
      // end shooting
      this.status = 'stand';
      this.imgY = 0;
      this.imagePosition = 5;
  this.frameAccumulator = 0;
    }
  }

  draw() {
  let destY = this.y;
    if (this.status === 'shooting' && this.imagePosition < 600) {
      this.context.drawImage(this.img, this.imagePosition, this.imgY, 60, 80, this.x, destY, 90, 120);
      return;
    }
    this.context.drawImage(this.img, this.imagePosition, this.imgY, 35, 52, this.x, destY, 60, 80);
  }
}
