class Init {
  constructor() {
    this.startGame();
  }

  startGame() {
    //
    /*var spaceBackground = new SpaceBackground();
    spaceBackground.init();*/

    player.stand();




    var soldier = new Soldier();
    soldier.init();
    soldier.run();
    //soldier.launchGranade();

    var rebelSoldier = new RebelSoldier();
    rebelSoldier.init();
    rebelSoldier.run();
  }



}
