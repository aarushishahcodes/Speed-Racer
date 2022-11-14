class Form {
  // creating properties
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("assets/title.png", "game title");
    // createElement is used to create messages/headings on screen
    this.greeting = createElement("h2");
  }

  // positioning properties on screen
  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  // deciding the style of the objects
  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  // hiding the elements once you go into the play state of the game
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  // once the button is pressed, we hide the input box and button since there is no use
  // we display a greeting to welcome the player into the game
  handleMousePressed() {
    this.playButton.mousePressed(()=>{
      this.playButton.hide();
      this.input.hide();
      
      var message = `
      Hello ${this.input.value()},
      </br> Wait for another player to join...`
      this.greeting.html(message);

      // player consists of index and name
      playerCount += 1;
      player.index = playerCount;
      player.name = this.input.value();
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    })
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
