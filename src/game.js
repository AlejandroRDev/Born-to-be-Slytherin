import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Stone from "./stone.js";
import Harry from "./harry.js";
import { buildLevel, levelOne, levelTwo, levelThree, levelFour, levelFive } from "./levels.js";

const gameState = {
  Paused: 0,
  Running: 1,
  Menu: 2,
  GameOver: 3,
  NewLevel: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight, harrysPerRow) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = gameState.Menu;
    this.paddle = new Paddle(this);
    this.stone = new Stone(this);
    this.harrys = [];
    this.gameObjects = [];
    this.lives = 3;

    this.levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    //con esto conseguimos que solo desde el menu se pueda iniciar/reset el juego.
    if (
      this.gamestate !== gameState.Menu &&
      this.gamestate !== gameState.GameOver &&
      this.gamestate !== gameState.NewLevel
    )
      return;

    this.harrys = buildLevel(this, this.levels[this.currentLevel]);
    this.stone.reset();
    this.gameObjects = [this.stone, this.paddle];

    this.gamestate = gameState.Running;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = gameState.GameOver;
      this.lives = 3;
    }

    if (
      this.gamestate === gameState.Paused ||
      this.gamestate === gameState.Menu
    )
      return;

    if (this.harrys.length === 0) {
      console.log("new level");
      this.currentLevel++;
      alert("YOU WIN, CONGRATULATIONS!")
      this.gamestate = gameState.NewLevel;
      this.start();
    }

    [...this.gameObjects, ...this.harrys].forEach((object) =>
      object.update(deltaTime)
    );

    this.harrys = this.harrys.filter((harry) => !harry.markedForDelete);
  }

  draw(context) {
    [...this.gameObjects, ...this.harrys].forEach((object) =>
      object.draw(context)
    );
    this.drawLives(context);
    //STATE PAUSED
    if (this.gamestate === gameState.Paused) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0,0.5)"; //Usamos RGBA para poder meterle opacity.
      context.fill();
      context.font = "40px Arial";
      context.fillStyle = "whitesmoke";
      context.textAlign = "center";
      context.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }
    //STATE MENU
    if (this.gamestate === gameState.Menu) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "black"; //Usamos RGBA para poder meterle opacity.
      context.fill();
      context.font = "40px Arial";
      context.fillStyle = "whitesmoke";
      context.textAlign = "center";
      context.fillText(
        "Press SPACEBAR",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    //STATE GAMEOVER
    if (this.gamestate === gameState.GameOver) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "black"; //Usamos RGBA para poder meterle opacity.
      context.fill();
      context.font = "40px Arial";
      context.fillStyle = "whitesmoke";
      context.textAlign = "center";
      context.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      context.fillText(
        "Press SPACEBAR to defeat Harry",
        this.gameWidth / 2,
        this.gameHeight - 50 / 2
      );
    }
  }

  drawLives(context, gameWidth) {
    context.font = "24px Arial";
    context.fillStyle = "#fccd32";
    context.fillText("Lives: " + this.lives, this.gameWidth - 65, 35);
  }
  pause() {
    if (this.gamestate == gameState.Paused) {
      this.gamestate = gameState.Running;
    } else {
      this.gamestate = gameState.Paused;
    }
  }
}

//font
