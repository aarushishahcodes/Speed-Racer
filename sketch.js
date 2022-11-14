// declaring global variables
var canvas;
var backgroundImage;
var database;
var form, game, player;
var gameState, playerCount;

var allPlayers, cars = [];
var car1, car1Image, car2, car2Image;
var track;

function preload() {
  backgroundImage = loadImage("assets/background.png");
  car1Image = loadImage("assets/car1.png");
  car2Image = loadImage("assets/car2.png");
  track = loadImage("assets/track.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if(playerCount === 2){
    game.updateState(1);
  }
  if(gameState === 1){
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
