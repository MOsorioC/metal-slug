class Marco extends GameObject {
  init() {
    this.width = 400;
    this.height = 600;
    this.x = 50;
    this.intervalID = 0;
    this.y = this.canvas.height - 150;
    this.imgY = 0;
    //this.imgY = 280;run
    this.img.src = './assets/marco/marco.png';
    this.imagePosition = 5;
    this.status = "stand";
    this.diff = 35;
    this.baja = false;
    this.img.onload = function(){
      //this.draw(10);
    }.bind(this);
    this.isJumping = false;
    this.shoots = [];
  }

  draw(frames){
    if(frames % 5 === 0) {
      if (this.status == "stand") {
        if (this.imagePosition < 100) {
          this.imagePosition = this.imagePosition + this.diff;
        } else {
          this.imagePosition = 5;
        }
      }
    } else if (frames % 2 === 0) {
      if (this.status == "run") {
        this.moveRight();
        if (this.imagePosition < 10){
          this.imagePosition = 10;
        }else if (this.imagePosition < 100) {
          //this.context.drawImage(this.img, this.imagePosition,280,35,52,this.x,this.y,60,80);
          this.imagePosition = this.imagePosition + 32;
        } else if (this.imagePosition < 170) {
          //this.context.drawImage(this.img, position - 3,280,35,52,this.x,this.y,60,80);
          this.imagePosition = this.imagePosition + 30;
        }else if (this.imagePosition < 230) {
          //this.context.drawImage(this.img, this.imagePosition + 4,280,35,52,this.x,this.y,60,90);
          this.imagePosition = this.imagePosition + 32;
        } else {
          this.imagePosition = -22;
        }
      } else if (this.status == "jump") {
        if (this.y > 200 && !this.baja) {
          this.y-= 10 * 2;
        } else {
            this.baja = true;
            this.y+= 10 * 2;
            if(this.y >=  this.canvas.height - 150){
              this.baja = false;
              this.status = "stand";
              this.imgY = 0;
              marco.imagePosition = 5;
            }
        }
      } else if (this.status == "shooting") {
          if (this.imagePosition < 450){
            this.imagePosition = 450;
          }
          else if (this.imagePosition < 600) {
            this.imagePosition = this.imagePosition + 55;
          } else if(this.imagePosition < 750) {
            this.imagePosition = this.imagePosition + 42;
          }else if(this.imagePosition < 790){
            this.imagePosition = this.imagePosition + 42;
          } else {
            this.status = "stand";
            this.imgY = 0;
            this.imagePosition = 5;
          }
      }
    }

    if (this.status == "run") {
      this.run();
    } else if(this.status == "stand"){
      this.context.drawImage(this.img, this.imagePosition,this.imgY,35,52,this.x,this.y,60,80);
    } else if(this.status == "jump"){
      //this.context.drawImage(this.img, this.imagePosition,this.imgY,35,52,this.x,this.y,60,80);
      this.context.drawImage(this.img, this.imagePosition,this.imgY,35,52,this.x,this.y,60,80);
    } else if(this.status == "shooting") {
      this.shoot();
    } else {
      this.context.drawImage(this.img, this.imagePosition,this.imgY,35,52,this.x,this.y,60,80);
    }
    //
    //this.context.drawImage(this.img, this.imagePosition,this.imgY,35,52,this.x,this.y,60,80);
  }

  moveRight() {
    this.x+=8;
  }

  stand() {
    var position = 5;
    let interval = 190;
    let diff = 35;
    //this.context.drawImage(this.img, position,this.y,35,52,200,this.canvas.height - 140,50,70);
    this.intervalID = setInterval(() => {

      if (position < 100) {
        this.context.clearRect(this.x, this.y,80,80);
        this.context.drawImage(this.img, position,this.imgY,35,52,this.x,this.y,60,80);
        this.width = 35;
        position = position + diff;
      } else {
        position = 5;
      }

    }, interval);
  }

  run() {
      if (this.imagePosition < 100) {
        this.context.drawImage(this.img, this.imagePosition,280,35,52,this.x,this.y,60,80);
      } else if (this.imagePosition < 190) {
        this.context.drawImage(this.img, this.imagePosition - 3,280,35,52,this.x,this.y,60,80);
      }else if (this.imagePosition < 230) {
        this.context.drawImage(this.img, this.imagePosition + 4,280,35,52,this.x,this.y,60,90);
      }
  }

  jump() {
    let position = 8;
    let interval = 50;
    let diff = 32;
    let xPrite = 225;
    this.isJumping = true;
    this.intervalID = setInterval(() => {
      //this.context.clearRect(this.x, this.y,100,100);
      this.y-= 10 * 2;
      this.context.drawImage(this.img, position,xPrite,35,52,this.x,this.y,60,80);
      if (this.y < 200 ) {
        this.jumpDown();
      }
    }, interval);
  }

  jumpDown() {
    this.stop();
    let position = 8;
    let interval = 50;
    let diff = 32;
    let xPrite = 225;
    this.intervalID = setInterval(() => {
      //this.context.clearRect(this.x, this.y,100,100);
      this.y+= 10 * 2;
      this.context.drawImage(this.img, position,xPrite,35,52,this.x,this.y,60,80);
      if (this.y >=  this.canvas.height - 150){
        this.isJumping = false;
        this.stop();
        this.status = "stand";
        //this.stand();
      }
    }, interval);
  }
  shoot() {
    if (this.imagePosition < 600) {
      this.context.drawImage(this.img, this.imagePosition,this.imgY,60,80,this.x,this.y,90,120);
    } else if(this.imagePosition < 750) {
      //this.context.drawImage(this.img, this.imagePosition + 5,this.imgY,40,60,this.x,this.y,60,90);
    }else if(this.imagePosition < 790){
      //this.context.drawImage(this.img, this.imagePosition,this.imgY,40,60,this.x,this.y,60,90);
    }
  }
  /*shoot() {
    if (!this.isJumping) {
      let position = 8;
      let interval = 1000/14;
      let diff = 32;
      let xPrite = 225;
      this.intervalID = setInterval(() => {
        this.context.clearRect(this.x, this.y,100,100);
        if (position < 200) {
          this.context.drawImage(this.img, position,xPrite,35,52,this.x,this.y,60,80);
          position = position + diff;
        } else if (position == 200) {
          this.context.drawImage(this.img, position + 3,xPrite,35,52,this.x,this.y,60,80);
          position = position + diff;
        } else {
          this.shooting();
        }
      }, interval);
    }
  }*/

  shooting() {
    if (!this.isJumping)
      this.stop();
    let position = 450;
    let interval = 1000/14;
    let diff = 55;
    let xPrite = 155;
    var shot = new Shoot();
    shot.init(this.x + 65, this.y);
    this.shoots.push(shot);

    this.intervalID = setInterval(() => {
      this.context.clearRect(this.x, this.y,90,120);
      if (position < 600) {
        this.context.drawImage(this.img, position,xPrite,60,80,this.x,this.y,90,120);
        position = position + diff;
      } else if(position < 750) {
        this.context.drawImage(this.img, position + 5,xPrite,40,60,this.x,this.y,60,90);
        position = position + 42;
      }else if(position < 790){
        this.context.drawImage(this.img, position,xPrite,40,60,this.x,this.y,60,90);
        position = position + 42;
      }else {
        if (!this.isJumping) {
          this.stop();
          this.stand();
        }
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
