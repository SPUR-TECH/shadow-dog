// Video 1 setup and player..... https://www.youtube.com/watch?v=c-1dBd1_G8A&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=12
// Video 2 state control..... https://www.youtube.com/watch?v=ug-gdfGb7I8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=13
// Video 3 Enemies..... https://www.youtube.com/watch?v=lqNztI7BMf8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=15
// Video 4 Collision detection and extra states..... https://www.youtube.com/watch?v=6ppfyWdoH3c&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=15
//  Video 5 Splash on dive state and dust animation on collision and game timer and game over..... https://www.youtube.com/watch?v=KICADKr_zeM&t=0s

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

    // let canvasPosition = canvas.getBoundingClientRect();

    // const fullscreen = document.getElementById("fullscreen");

    // function toggleFullscreen() {
    //     if (!document.fullscreenElement) {
    //         canvas.requestFullscreen().catch(err => {
    //             alert(`Error cant enable full-screen mode: ${err.message}`);
    //         });
    //     } else {
    //         document.exitFullscreen();
    //     }
    // }
    // fullscreen.addEventListener('click', toggleFullscreen);
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
            this.maxParticles = 80;
            this.enemyTimer = 0;
            this.enemyInterval = 1500;
            this.speed = 0;
            this.maxSpeed = 6;
            this.score = 0;
            this.fontColor = 'yellow'
            this.time = 0;
            this.maxTime = 10000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });

            // Handle particles
            this.particles.forEach((particles, index) => {
                particles.update();
                if (particles.markedForDeletion) this.particles.splice(index, 1);
            });
            if (this.particles.length > this.maxParticles) {
                this.particles = this.maxParticles;
            }
            // Handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            });
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
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.3) this.enemies.unshift(new GroundZombie(this));
            if (this.speed > 0 && Math.random() < 0.3) this.enemies.unshift(new WalkingZombie(this));
            else if (this.speed > 0) this.enemies.unshift(new ClimbingEnemy(this));
            this.enemies.unshift(new BatEnemy(this));
            this.enemies.unshift(new RavenEnemy(this));
        }
    }

    let game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    let fixedTimeStep = 16; // 60 FPS (1000ms / 60)

    function updateLoop(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        while (deltaTime >= fixedTimeStep) {
            game.update(fixedTimeStep);
            deltaTime -= fixedTimeStep;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);

        if (!game.gameOver) requestAnimationFrame(updateLoop);
    }

    updateLoop(0);
});