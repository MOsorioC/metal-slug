class Soldier extends GameObject {

  init() {
    this.intervalID = 0;
    this.width = 1128;
    this.height = 2000;
    this.x = this.canvas.width;

    this.img.src = './assets/soldier/soldier.png';
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  }

  draw(){
    this.context.clearRect(this.x, this.canvas.height - 140,60,75);
    //this.context.drawImage(this.img, this.x,this.y,35,45,200,this.canvas.height - 140,50,70);
  }

  stand() {
    this.clear();
    var position = 0;
    let interval = 160;
    let diff = 33;

    this.intervalID = setInterval(() => {
      if (position < 100) {
        this.context.clearRect(this.x, this.canvas.height - 140,60,75);
        this.context.drawImage(this.img, position,this.y,35,45,this.x,this.canvas.height - 140,50,70);
        position = position + diff;
      } else {
        position = 0;
      }
    }, interval);
  }

  run() {
    var position = 0;
    let interval = 1000/16;
    let diff = 33;

    this.intervalID = setInterval(() => {

      //this.clear();
      this.context.clearRect(this.x, this.canvas.height - 140,60,75);
      this.context.drawImage(this.img, position,46,32,43,this.x,this.canvas.height - 140,49,70);
      if (position < 300) {
        position = position + diff;
        this.x-=5;
      } else {
        position = 0;
      }
      if(this.x < 200 )
        this.stop(1);
    }, interval);
  }

  clear() {
    //this.context.clearRect(0, 0,this.canvas.width,this.canvas.height);
  }

  launchGranade() {
    this.clear();
    var position = 0;
    let interval = 1000/15;
    let diff = 35;

    this.intervalID = setInterval(() => {
      if (position < 140) {
        this.context.clearRect(this.x , this.canvas.height - 140,60,75);
        this.context.drawImage(this.img, position,460,32,43,this.x,this.canvas.height - 135,49,70);
        position = position + diff;
      } else if (position < 250){
        position = position + 50;
        this.context.clearRect(this.x , this.canvas.height - 140,60,75);
        this.context.drawImage(this.img, position,460,38,45,this.x,this.canvas.height - 135,49,70);
      } else if (position < 500){
        position = position + 43;
        this.context.clearRect(this.x , this.canvas.height - 140,60,75);
        this.context.drawImage(this.img, position,460,38,45,this.x,this.canvas.height - 135,60,75);
      }
       else {
        position = 0;
      }
    }, interval);
  }

  stop(option) {
    clearInterval(this.intervalID);
    switch (option) {
      case 1:
        this.stand();
        break;
      case 2:
        this.launchGranade();
      break;
      default:
        break;
    }
  }
}
