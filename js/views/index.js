class Init {
  constructor() {
    this.startGame();
  }

  startGame() {
    //
    /*var spaceBackground = new SpaceBackground();
    spaceBackground.init();*/

    var player = new Player();
    player.init();

    var soldier = new Soldier();
    soldier.init();
    soldier.run();
    //soldier.launchGranade();

    var rebelSoldier = new RebelSoldier();
    rebelSoldier.init();
    rebelSoldier.run();
  }

}
