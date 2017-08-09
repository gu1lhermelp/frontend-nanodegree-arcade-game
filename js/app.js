// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.init_x = x;
    this.y = y;
    this.init_y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = this.init_x;
  this.y = this.init_y;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  Enemy.call(this, x, y);
  this.sprite = 'images/char-boy.png';
};
// Delegation to enemy prototype
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.y < -5) {
    this.y = -5;
  }
  if (this.y > 425) {
    this.y = 425;
  }
};
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= 35;
      break;
    case 'up':
      this.y -= 15;
      break;
    case 'right':
      this.x += 35;
      break;
    case 'down':
      this.y += 15;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(100, 140, 60), new Enemy(200, 70, 90),
              new Enemy(300, 210, 40)];
player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
