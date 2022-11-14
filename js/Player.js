class Player {
  constructor() {
    this.index = null;
    this.name = null;
    this.positionX = 0;
    this.positionY = 0;
    this.fuel = 185;
    this.life = 185;
    this.rank = 0;
    this.score = 0;
  }

  // reading playerCount from the database
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  // updating playerCount in the database
  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    });
  }

  // adding player in the database
  addPlayer() {
    var playerIndex = "players/player" + this.index;
    if(this.index === 1){
      this.positionX = width/2 - 100;
    }
    else{
      this.positonX = width/2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      fuel: this.fuel,
      life: this.life,
      rank: this.rank,
      score: this.score
    });
  }

  // getting player information from the database
  // static functions are those that are related to the class, not the objects inside them
  static getPlayerInfo() {
    var playerInformationRef = database.ref("players");
    playerInformationRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }

  // updating player's information from the database
  updatePlayer() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      fuel: this.fuel,
      life: this.life,
      rank: this.rank,
      score: this.score
    });
  }

  // getting player's distance from the database
  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index)
    playerDistanceRef.on("value", (data) => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    })
  }
}
