
let gameScore = 0,
Game = 3,
	GameLeft = document.querySelector('.Game > span'),
	score = document.querySelector('.score > span');
	// sound and music
	
	const gameOverSound = new Audio('sounds/loos.wav');
const winSound = new Audio('sounds/win.wav');
// Enemies our player must avoid
class Enemy {
	constructor(x, y, speed) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		this.x = x;
		this.y = y;
		this.speed = speed;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';

	}
	


	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any speed by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += this.speed * dt;
		GameLeft.innerText = Game;

		// Restarts enemy speed from the left when Player reaches the water
		if (this.x > 505) {
			this.x = -150;
			//Controls the enemy speed speed
			
			this.speed = 150 + Math.floor(Math.random() * 800);

		}

		// Checks collisons and restarts player at the bottom
		if (player.x < this.x + 60 &&
			player.x + 37 > this.x &&
			player.y < this.y + 25 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			Game--;
			GameLeft.innerText = Game;
			if (Game === 0) {
				//game over
				loose() ;
				
				
			}
		}
	};
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/char-cat-girl.png';
	}
	update() {
		// Stops Player from moving off the left/right side of canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// Once player reaches the water, 10 points will be added to their game score
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			gameScore++;
			score.innerText = gameScore * 10;
			if (gameScore === 10 && Game > 0) {
				// win the game
				
				setTimeout(function() {
					win();
				}, 1000);
			}
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Moves Player with keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
				this.x -= this.speed + 50;
				break;
			case 'up':
				this.y -= this.speed + 30;
				break;
			case 'right':
				this.x += this.speed + 50;
				break;
			case 'down':
				this.y += this.speed + 30;
				break;
		}
	}
}
// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, speed
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
	
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
// - - - - CALL STARTER 
start();
//START 
function start() {
    // Create instructions win
   let  start = document.createElement('DIV');
    start.classList.add('start');

    // add header
    let startHeader = document.createElement('h3');
    startHeader.classList.add('startHeader');
    startHeader.textContent = 'How to play?';

    // add info about the game
    let instructions = document.createElement('DIV');

    let firstLine = document.createElement('DIV');
    firstLine.classList.add('instruction-div');

   
    let firstLineText = document.createElement('h4');
    firstLineText.classList.add('instruction-first-line');
    firstLineText.textContent = 'The goal of the player is to reach the water, without colliding into any one of the enemies..';

    firstLine.append( firstLineText);

    
    let secondLine = document.createElement('h4');
    secondLine.classList.add('instruction-text');
    secondLine.textContent = 'You can move with the arrow keys (← ↑ → ↓) if you collect more than 100 point Congratulation you Win  ';

    instructions.append(firstLine, secondLine);

    
   
        
    start.append(startHeader, instructions);

    document.body.appendChild(start);  

}

function win() {
    // winner music
    
    // play winner music
    winSound.play();

    confirm('Congratulation**You won the game**');
				Game = 3;
				gameScore = 0;
				GameLeft.innerText = Game;
				score.innerText = '';
}
function loose() {

   
    // play game over sound
    gameOverSound.play();
    
	confirm('GAME OVER');
	Game = 3;
	gameScore = 0;
	GameLeft.innerText = Game;
	score.innerText = '';
}