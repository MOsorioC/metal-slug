let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let isPressed = false;
let isShooting = false;
let isJumping = false;
let isPressedTarma = false;


window.onload = function () {
  var foo = new Sound("./assets/escape.mp3",100,true);
  foo.start();
  //foo.stop();
  //foo.start();
  //foo.init(100,false);
  //foo.remove();

  let marco = new Marco();
  let tarma = new Marco();
  let soldier = new Soldier();
  soldier.init();
  let soldier2 = new Soldier();
  soldier2.init();
  soldier2.stop = 300;
  soldier2.x = canvas.width + 200;
  let soldier3 = new Soldier();
  soldier3.init();
  soldier3.stop = 370;
  soldier3.x = canvas.width + 250;

  let rebelSoldier = new RebelSoldier();
  rebelSoldier.init();
  let board = new SpaceBackground();
  let intervalo
  let frames = 0;
  board.init();
  marco.init();
  tarma.init();
  tarma.x = 80;
  function update() {
    frames++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.draw();

    marco.draw(frames);
    tarma.draw(frames);
    soldier.draw(frames);
    soldier2.draw(frames);
    soldier3.draw(frames);
    rebelSoldier.draw(frames);
  }

  function stop(){
    clearInterval(intervalo)
    intervalo = 0
  }

  function startGame() {
    if(intervalo > 0) return

    intervalo = setInterval(function() {
      update()
    },1000/16)
  }

  startGame();
  addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    if(e.keyCode === 39) {
      if (!isPressed) {
        isPressed = true;
        marco.status = "run";
        marco.imgY = 280;
        marco.imagePosition = -22;
      }
    } else if(e.keyCode === 32) {
      var shot = new Shoot();
      shot.init(marco.x + 65, marco.y);
      marco.shoots.push(shot);

      marco.status = "shooting";
      marco.imgY = 155;
      marco.imagePosition = 400;
    } else if(e.keyCode === 40) {
    }else if(e.keyCode === 38) {
      marco.status = "jump";
      marco.imgY = 225;
      marco.imagePosition = 8;
    } else if(e.keyCode === 68){
      if (!isPressedTarma) {
        isPressedTarma = true;
        tarma.status = "run";
        tarma.imgY = 280;
        tarma.imagePosition = -22;
      }
    } else if(e.keyCode === 70){
      var shot = new Shoot();
      shot.init(tarma.x + 65, tarma.y);
      tarma.shoots.push(shot);

      tarma.status = "shooting";
      tarma.imgY = 155;
      tarma.imagePosition = 400;
    } else if(e.keyCode === 87){
      tarma.status = "jump";
      tarma.imgY = 225;
      tarma.imagePosition = 8;
    }


  });

  addEventListener('keyup',(e) => {
    if(e.keyCode === 39) {
      isPressed = false;
      marco.status = "stand";
      marco.imgY = 0;
      marco.imagePosition = 5;
    } else if(e.keyCode === 68) {
      isPressedTarma = false;
      tarma.status = "stand";
      tarma.imgY = 0;
      tarma.imagePosition = 5;
    }
    //marco.status = "stand";
  });
};


function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}
