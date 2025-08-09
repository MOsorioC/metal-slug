class Background extends GameObject {
  init() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.img.src = './assets/background_1.png';
    this.timer = 59; // seconds countdown placeholder
    this.numbersImg = new Image();
    this.numbersImg.src = './assets/extras/numbers.png';
  }

  draw() {
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawHUD(score, timeLeft, difficulty) {
    this.context.font = '16px Arial';
    this.context.fillStyle = '#fff';
    this.context.fillText(`SCORE: ${score}`, 15, 25);
    this.context.fillText(`TIME: ${Math.max(0, Math.ceil(timeLeft))}`, 15, 45);
    if (difficulty !== undefined) {
      const pct = Math.round(difficulty * 100);
      this.context.fillText(`DIFF: ${pct}%`, 15, 65);
    }
  }
}
