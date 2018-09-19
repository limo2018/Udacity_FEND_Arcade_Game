//App.js
'use strict';
// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
   this.x = x;
   this.y = y;
   this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  //this.x += 1;
   if (this.x < 500) {
     //Move forward
     //Increment x by speed * dt
     this.x += this.speed * dt;
   } else {
     //Reset bugs to the starting point
     this.x = 0;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
 this.sprite = 'images/char-boy.png';
 /*According to the drawImage mothod in engine.js,
 the player and bugs move in the blocks that width is 101 pixels and height is 83 pixels*/
 this.x = 202;//101*2 = 202: player's starting point on x-axis
 this.y = 400;//83*4 + 68 = 400: player's starting point on y-axis
 };

Player.prototype.reset = function () {
  this.x = 202;//reset player to the starting X
  this.y = 400;//reset player to the starting y
};

// Referenced update function from solittletim: https://github.com/solittletime/frontend-nanodegree-arcade-game
Player.prototype.update = function(dt) {
  /* Check collision. There is an off set of x = 15 and y = 20 whencheck for collisions.
  The collision happens when the player and bug(s) are separated by an offset of x = 40 and y = 40.
  That is a hypotenuse of about 56 from math.
  */
  for (let enemy of allEnemies) {
    let deltax = this.x - enemy.x - 15;
    let deltay = this.y - enemy.y - 20;
    let distance = Math.sqrt(deltax * deltax + deltay * deltay);
    if (distance < 56) {
      //Collision zone
      //Reset the player to starting X and Y
      console.log('Hit!')
      alert('Collision happened! \nPlease click "OK" to reset the game.')
      this.reset();
    }
  }
  // Check if the player reachs the water
  if (this.y < 8) {
    console.log('Win!');
    alert('Congratulations, you won!\nPlease click "OK" to reset the game.');
    this.y = 400;//reset the player to the start point
  }
};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
  new Enemy(-200, 60, 400),
  new Enemy(-180, 140, 300),
  new Enemy(-120, 230, 300),
  new Enemy(-220, 230, 300)];

const player = new Player();

Player.prototype.handleInput = function(dt) {switch (dt) {
  /*According to the drawImage mothod in engine.js,
   the player and bugs move in the blocks that width is 101 pixels and height is 83 pixels*/
   case "up":
   if (this.y > 0) {
     //set top boundary for the player
    this.y -= 83;
   }
     break;
   case "down":
   if (this.y < 332) {
     //set bottom boundary for the player. 83 x 4 steps = 332.
    this.y += 83;
   }
     break;
   case "left":
   if (this.x > 0){
     //set left boundary for the player
     this.x -= 101;
   }
     break;
   case "right":
   if (this.x < 404)
    //set righy boundary for the player. 101 x 4 steps = 404.
     this.x += 101;
     break;
 }
};
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

/*Referenced Solittletime's Udcity Forum post - How to get the basic display to work: Arcade Game
 (https://github.com/solittletime/frontend-nanodegree-arcade-game),
Matthew Cranford's Arcade Game Walkthrough blog post, and https://developer.mozilla.org
for functions and methods .*/
