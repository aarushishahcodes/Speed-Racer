class Game {
  constructor() {}

  // start state = 0 | play state = 1 | end state = 2
  // reading game state from the database
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", (data) => {
      gameState = data.val();
    });
  }

  // updating game state in the database
  updateState(state){
    database.ref('/').update({
      gameState: state
    });
  }

  start() {
    // creating a form object from Form class
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();
    
    // creating car sprites
    car1 = createSprite(width/2 - 100, height - 100);
    car1.addImage("car1", car1Image);
    car1.scale = 0.07;

    car2 = createSprite(width/2 + 100, height - 100);
    car2.addImage("car2", car2Image);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40,40);
    form.titleImg.class("gameTitleAfterEffect")
  }

  play() {
    this.handleElements();
    
    // since getPlayerInfo is a static function, it will be called by Player class and not the object
    Player.getPlayerInfo();

    if(allPlayers != undefined){
      image(track, 0, -height * 5, width, height * 6);

      // storing the index of an array
      var index = 0;

      // for every player, in the allPlayers array
      for(var plr in allPlayers) {
        // increase index by one for every player
        index += 1;

        // recording x and y position of the player in the database
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        // positioning the cars where the players are
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        // marking the active player car
        if(index === player.index) {
          fill("blue");
          ellipse(x, y, 60, 60);
          
          // moving the camera along the active car
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();
      drawSprites();

    }
  }

  // controls the car's position via arrow keys
  handlePlayerControls() {
    
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.updatePlayer();
    }

       if(keyIsDown(LEFT_ARROW)){
         player.positionX -= 10;
         player.updatePlayer();
       }
    
      if(keyIsDown(RIGHT_ARROW)){
         player.positionX += 10;
         player.updatePlayer();
       }

  }
}
