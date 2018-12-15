class Soldier extends GameObject {

  init() {
    this.intervalID = 0;
    this.width = 1128;
    this.height = 2000;
    this.x = canvas.width;
    this.imgY = 46;
    this.imagePosition = 0;
    this.status = "run";
    this.diff = 33;
    this.stop = 200;
    this.img.src = './assets/soldier/soldier.png';
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  }

  draw(frames) {
    if(frames % 4 === 0) {
      if (this.status == "stand") {
        if (this.imagePosition < 100) {
          this.imagePosition = this.imagePosition + this.diff;
        } else {
          this.imagePosition = 0;
        }
      }
    } else if (frames % 1 === 0) {
      if(this.status == "run") {
        this.x-=5;
        if (this.imagePosition < 300) {
          this.imagePosition = this.imagePosition + this.diff;
        } else {
          this.imagePosition = 0;
        }

        if(this.x < this.stop ) {
          this.imgY = 0;
          this.imagePosition = 0;
          this.status = "stand";
          this.diff = 33;
        }
      }
    }

    if (this.status == "stand"){
      this.context.drawImage(this.img, this.imagePosition,this.imgY,35,45,this.x,this.canvas.height - 140,50,70);
    } else {
      this.context.drawImage(this.img, this.imagePosition,this.imgY,32,43,this.x,this.canvas.height - 140,49,70);
    }

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
