class RebelSoldier extends GameObject {
  init() {
    this.intervalID = 0;
    this.width = 1128;
    this.height = 2000;
    this.x = this.canvas.width + 200;
    this.imgY = 42;
    this.imagePosition = 450;
    this.status = "run";
    this.diff = 41;
    this.stop = 600;
    this.img.src = './assets/soldier/rebel.png';
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  }

  draw(frames) {
    if (frames % 4 === 0) {
      if(this.status == "stand") {

        if (this.imagePosition < 140) {
          this.imagePosition+=this.diff;
        } else {
          this.imagePosition = 12;
        }
      }
    } else {
      if(this.status == "run") {
        this.x-=5;
        if (this.imagePosition > 0) {
          this.imagePosition-= this.diff;
        } else {
          this.imagePosition = 450;
        }
        if(this.x < this.stop ) {
          this.imgY = 0;
          this.imagePosition = 12;
          this.status = "stand";
          this.diff = 40;
        }
      }
    }

    if(this.status == "stand") {
      this.context.drawImage(this.img, this.imagePosition - 4,this.imgY,40,45,this.x,this.canvas.height - 140,50,70);
    } else {
      this.context.drawImage(this.img, this.imagePosition,this.imgY,40,43,this.x,this.canvas.height - 140,55,75);
    }
    /*this.context.clearRect(this.x, this.canvas.height - 140,60,75);
    //this.context.drawImage(this.img, this.x,this.y,35,45,200,this.canvas.height - 140,50,70);
    this.context.drawImage(this.img, 300,this.y,35,45,this.x,this.canvas.height - 140,50,70);*/
  }

  stand() {
    this.clear();
    var position = 12;
    let interval = 160;
    let diff = 40;
    let imagen = 1;
    this.intervalID = setInterval(() => {
      if (position < 140) {
        this.context.clearRect(this.x, this.canvas.height - 140,60,75);
        this.context.drawImage(this.img, position - 4,this.y,40,45,this.x,this.canvas.height - 140,50,70);
        position = position + diff;
      } else {
        imagen= 1;
        position = 12;
      }
    }, interval);
  }

  run() {
    var position = 450;
    let interval = 1000/12;
    let diff = 41;

    this.intervalID = setInterval(() => {

      this.context.clearRect(this.x, this.canvas.height - 140,100,100);
      this.context.drawImage(this.img, position,42,40,43,this.x,this.canvas.height - 140,55,75);
      if (position > 0) {
        position = position - diff;
        this.x-=5;
      } else {
        position = 450;
      }
      if(this.x < 600 )
        this.stop(1);
    }, interval);
  }

  clear() {
    //this.context.clearRect(0, 0,this.canvas.width,this.canvas.height);
  }

  /*launchGranade() {
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
  }*/

  isTouching(shot) {
     return (this.x < shot.x + shot.width)  &&
            (this.x + this.width > shot.x)
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
