//Handing keyboard input.

export default class InputHandler {
  constructor(paddle, game) {
    document.body.addEventListener("keydown", (event) => {

      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        
        case 39:
           paddle.moveRight();
           break;

        case 80:
          game.pause();
          break;

        case 32:
          game.start();
          break;
        case 82:
          game.start();
          break;
      }
    });
    document.body.addEventListener("keyup", (event) => {

      switch (event.keyCode) {
        case 37:
         if(paddle.speed < 0) paddle.stop();
          break;
        
        case 39:
          if(paddle.speed > 0) paddle.stop();
           break;
      }
    });
  }
}
