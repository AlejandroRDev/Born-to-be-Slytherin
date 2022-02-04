import { detectCollision } from './collisionDetection.js';

export default class Harry {
  constructor(game, position) {
    this.image = document.getElementById("img_harry");

    this.game = game;

    this.position = position

    this.width= 100;
    this.height= 80;

    this.markedForDelete = false;
  }

  update() {
      if(detectCollision(this.game.stone, this)) {
          this.game.stone.speed.y = -this.game.stone.speed.y;
        
          this.markedForDelete = true;
      
        }
  }

  draw(context) {
    context.drawImage(
        this.image,
        this.position.x, 
        this.position.y, 
        this.width,
        this.height);
  }
}
