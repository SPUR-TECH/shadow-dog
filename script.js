// Video 1 setup and player..... https://www.youtube.com/watch?v=c-1dBd1_G8A&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=12
// Video 2 state control..... https://www.youtube.com/watch?v=ug-gdfGb7I8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=13
// Video 3 Enemies..... https://www.youtube.com/watch?v=lqNztI7BMf8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=15
// Video 4 Collision detection and extra states..... https://www.youtube.com/watch?v=6ppfyWdoH3c&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=15
//  Video 5 Splash on dive state and dust animation on collision..... https://www.youtube.com/watch?v=KICADKr_zeM&t=0s

import {
    states
} from './playerStates.js';
import {
    Player
} from './player.js';
import {
    InputHandler
} from './inputHandler.js';
import {
    BatEnemy,
    RavenEnemy,
    ClimbingEnemy,
    WalkingZombie,
    GroundZombie
} from './enemies.js';
import {
    UI
} from './UI.js';
import {
    Background
} from './background.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1600;
    canvas.height = 710;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 70;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.onScreenEnemies = [];
            this.maxParticles = 80;
            this.enemyTimer = 0;
            this.enemyInterval = 800;
            this.speed = 0;
            this.maxSpeed = 6;
            this.score = 0;
            this.winningScore = 60;
            this.energy = 0;
            this.maxEnergy = 10;
            this.energyIncreaseTimer = 0;
            this.fontColor = 'yellow';
            this.time = 0;
            this.maxTime = 60000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.zombieSound = new Audio();
            this.zombieSound.src = './sounds/zombie-growl.mp3';
            this.diggingZombieSound = new Audio();
            this.diggingZombieSound.src = './sounds/digging-zombie.mp3';
            this.backgroundSound = new Audio();
            this.backgroundSound.src = './sounds/background.mp3';
            this.spiderSound = new Audio();
            this.spiderSound.src = './sounds/spider.mp3';
            this.ravenSound = new Audio();
            this.ravenSound.src = './sounds/raven.mp3';
            this.batSound = new Audio();
            this.batSound.src = './sounds/bat.mp3';

            // Add a flag to track if the game has started
            this.gameStarted = false;

            document.querySelector('#startButton').addEventListener('click', () => {
                if (!this.gameStarted) {
                    // Start the game and the timer
                    this.gameStarted = true;

                    document.querySelector('#startButton').style.display = 'none';

                    if (this.gameOver) {
                        // Stop the background music if the game is over
                        this.backgroundSound.stop();
                    }
                }
            });
        }

        update(deltaTime) {
            if (this.gameOver) {
                // Stop the background music if the game is over
                this.backgroundSound.stop();
            }

            if (!this.gameStarted) {
                return; // Don't update the game if it hasn't started
            }
            this.backgroundSound.play();

            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);



            // Decrease energy every second when rolling is active
            if (this.player.isRolling()) {
                this.energyDecreaseTimer += deltaTime;
                if (this.energyDecreaseTimer >= 1000) {
                    this.energyDecreaseTimer -= 1000; // Reset the timer
                    if (this.energy > 0) {
                        this.energy--;
                    } else {
                        // Stop rolling if energy is 0
                        this.player.setState(states.RUNNING, 1);
                    }

                }
                // Reset the energy increase timer when rolling
                this.energyIncreaseTimer = 0;
            } else {
                // Reset the energy decrease timer when not rolling
                this.energyDecreaseTimer = 0;

                this.energyIncreaseTimer += deltaTime;
                // Increase energy every 3 seconds
                if (this.energyIncreaseTimer >= 3000) {
                    this.energyIncreaseTimer -= 3000; // Reset the timer
                    if (this.energy < this.maxEnergy) this.energy++;
                }
            }



            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            this.floatingMessages.forEach(message => {
                message.update(deltaTime);
            });

            this.particles.forEach((particles, index) => {
                particles.update();
            });

            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            this.particles.forEach(particle => {
                particle.draw(context);
            });

            this.collisions.forEach(collision => {
                collision.draw(context);
            });

            this.floatingMessages.forEach(message => {
                message.draw(context);
            });

            this.UI.draw(context);
        }

        addEnemy() {
            if (this.speed > 0) {
                const randomValue = Math.random();
                if (randomValue < 0.25) {
                    this.enemies.unshift(new GroundZombie(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.diggingZombieSound.play();
                } else if (randomValue < 0.5) {
                    this.enemies.unshift(new WalkingZombie(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.zombieSound.play();
                } else if (randomValue < 0.75) {
                    this.enemies.unshift(new ClimbingEnemy(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.spiderSound.play();
                } else if (randomValue < 0.85) {
                    this.enemies.unshift(new BatEnemy(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.batSound.play();
                } else if (randomValue < 0.95) {
                    this.enemies.unshift(new RavenEnemy(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.ravenSound.play();
                }
            }
        }
    }

    let game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function updateLoop(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.UI.draw(ctx); // Draw the UI after clearing the canvas

        if (!game.gameOver) requestAnimationFrame(updateLoop);
    }
    updateLoop(0);
});