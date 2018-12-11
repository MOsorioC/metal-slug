class Marco extends GameObject {
  init() {
    this.width = 400;
    this.height = 600;
    this.x = 50;
    this.intervalID = 0;
    this.y = this.canvas.height - 150;
    this.imgY = 0;
    this.img.src = './assets/marco/marco.png';
    this.img.onload = function(){
      //this.stand();
    }.bind(this);

    this.shoots = [];
  }

  draw(){
    this.context.drawImage(this.img, this.x + 30,this.y,35,40,20,this.canvas.height - 140,50,70);
  }

  stand() {
    var position = 5;
    let interval = 190;
    let diff = 35;
    //this.context.drawImage(this.img, position,this.y,35,52,200,this.canvas.height - 140,50,70);
    this.intervalID = setInterval(() => {

      if (position < 100) {
        this.context.clearRect(this.x, this.canvas.height - 150,80,80);
        this.context.drawImage(this.img, position,this.imgY,35,52,this.x,this.y,60,80);
        this.width = 35;
        position = position + diff;
      } else {
        position = 5;
      }

    }, interval);
  }

  run() {
    var position = 10;
    let interval = 1000/14;
    let diff = 32;
    //this.context.drawImage(this.img, position,280,35,52,200,this.canvas.height - 140,50,70);
    this.intervalID = setInterval(() => {
      this.context.clearRect(this.x, this.canvas.height - 150,100,100);
      this.x+=8;
      if (position < 100) {
        this.context.drawImage(this.img, position,280,35,52,this.x,this.canvas.height - 150,60,80);
        position = position + diff;
      } else if (position < 190) {
        this.context.drawImage(this.img, position - 3,280,35,52,this.x,this.canvas.height - 150,60,80);
        position = position + 30;
      }else if (position < 230) {
        this.context.drawImage(this.img, position + 4,280,35,52,this.x,this.canvas.height - 150,60,90);
        position = position + 32;
      } else {
        position = 10;
      }

    }, interval);
  }

  shoot() {
    let position = 8;
    let interval = 1000/14;
    let diff = 32;
    let xPrite = 225;
    this.intervalID = setInterval(() => {
      this.context.clearRect(this.x, this.canvas.height - 150,100,100);
      if (position < 200) {
        this.context.drawImage(this.img, position,xPrite,35,52,this.x,this.canvas.height - 150,60,80);
        position = position + diff;
      } else if (position == 200) {
        this.context.drawImage(this.img, position + 3,xPrite,35,52,this.x,this.canvas.height - 150,60,80);
        position = position + diff;
      } else {
        this.shooting();
      }
    }, interval);
  }

  shooting() {
    this.stop();
    let position = 450;
    let interval = 1000/14;
    let diff = 55;
    let xPrite = 155;
    var shot = new Shoot();
    shot.init(this.x + 65, this.y);
    this.shoots.push(shot);

    this.intervalID = setInterval(() => {
      this.context.clearRect(this.x, this.canvas.height - 150,90,120);
      if (position < 600) {
        this.context.drawImage(this.img, position,xPrite,60,80,this.x,this.canvas.height - 150,90,120);
        position = position + diff;
      } else if(position < 750) {
        this.context.drawImage(this.img, position + 5,xPrite,40,60,this.x,this.canvas.height - 150,60,90);
        position = position + 42;
      }else if(position < 790){
        this.context.drawImage(this.img, position,xPrite,40,60,this.x,this.canvas.height - 150,60,90);
        position = position + 42;
      }else {
        this.stop();
        this.stand();
      }
    }, interval);
  }

  removeShoots() {
    this.shoots = this.shoots.filter((e) => {
      return e.x < this.canvas;
    });
  }


  stop() {
    clearInterval(this.intervalID);
  }
}
