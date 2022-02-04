/* Creo una calse Paddle que luego exporto al index. A la que le añado
un constructor con el gameWidth y el gameHeight, para sacar los valores del width, height y el position.
Posteriormente realizo una función draw para pintarlo usando el context y los valores que consigo
mediante el constructor, lo exportamos por que si no index no sabe que es Paddle. */

export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;

    this.width = 150;
    this.height = 30;

    this.maxSpeed = 7;
    this.speed = 0;

    //con esto hacemos que la posicion del paddle este en el centro de la pantalla.
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10,
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop(){
    this.speed = 0;
  }

  //Aqui tenemos una funcion de dibujo.
  draw(context) {
    context.fillStyle = "#0ff";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  //Funcion de update
  update(deltaTime) {
    //Si no ponemos la condicion nos saltara un error y no nos pintara el paddle, porque deltatime es 0.
    this.position.x += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
/* con la funcion update conseguimos que se mueva 5px por segundo. Por lo tanto la función 
va a tener un param llamado DELTA TIME: significa cuanto tiempo ha pasado desde la ultima update de frame
 */
