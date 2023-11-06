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
            this.enemyInterval = 1500;
            this.speed = 0;
            this.maxSpeed = 6;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = 'yellow';
            this.time = 0;
            this.maxTime = 30000;
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

            // Add a flag to track if the game has started
            this.gameStarted = false;

            document.querySelector('#startButton').addEventListener('click', () => {
                if (!this.gameStarted) {
                    // Start the game and the timer
                    this.gameStarted = true;

                    document.querySelector('#startButton').style.display = 'none';

                    if (this.gameOver) {
                        // Stop the background music if the game is over
                        this.backgroundSound.pause();
                    }
                }
            });
        }

        update(deltaTime) {
            if (this.gameOver) {
                // Stop the background music if the game is over
                this.backgroundSound.pause();
            }

            if (!this.gameStarted) {
                return; // Don't update the game if it hasn't started
            }
            this.backgroundSound.play();

            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

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
                    this.diggingZombieSound.play();
                } else if (randomValue < 0.5) {
                    this.enemies.unshift(new WalkingZombie(this));
                    this.onScreenEnemies.push(this.enemies[0]);
                    this.zombieSound.play();
                } else if (randomValue < 0.75) {
                    this.enemies.unshift(new ClimbingEnemy(this));
                } else {
                    this.enemies.unshift(new BatEnemy(this));
                    this.enemies.unshift(new RavenEnemy(this));
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
        deltaTime -= lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);

        if (!game.gameOver) requestAnimationFrame(updateLoop);
    }

    updateLoop(0);
});