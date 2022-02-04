import Game from './game.js';
//Recojo la gamescreen por id.
let canvas = document.getElementById('gameScreen');
//creo el context donde voy a realizar el dibujo dandole un rendering context de 2D
//para los dibujos del canvas.
let context = canvas.getContext('2d');

const gameWidth$$ =  800;
const gameHeight$$ = 600;
let counter = Game.lives;

let game = new Game(gameWidth$$, gameHeight$$);
let lives = Game.lives;

let lastTime = 0;

/* IMAGES */

let imgStone = document.getElementById('img_stone');


function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    console.log(game.lives);

    context.clearRect(0, 0, gameWidth$$, gameHeight$$);
    
    game.update(deltaTime);
    game.draw(context);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);




let counterContainer = document.getElementById('liveCounter-container');

