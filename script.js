// Video 1 setup and player..... https://www.youtube.com/watch?v=c-1dBd1_G8A&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=12
// Video 2 state control..... https://www.youtube.com/watch?v=ug-gdfGb7I8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=13
// Video 3 Enemies..... https://www.youtube.com/watch?v=lqNztI7BMf8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=15

import {
    Player
} from './player.js';
import {
    InputHandler
} from './inputHandler.js';
import {
    Sitting
} from './playerStates.js';
import {
    FlyingEnemy,
    ClimbingEnemy,
    GroundEnemy
} from './enemies.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1600;
    canvas.height = 710;

    let gameSpeed = 2;

    // let enemies = [];
    // let score = 0;
    // let gameOver = false;

    // let explosions = [];
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
            this.groundMargin = 50;
            this.player = new Player(this);
            this.InputHandler = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1500;
            this.speed = gameSpeed;
        }
        update(deltaTime) {
            this.player.update(this.InputHandler.keys, deltaTime);
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
        }
        draw(context) {
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.3) this.enemies.push(new GroundEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            console.log(this.enemies)
        }
    }

    const game = new Game(canvas.width, canvas.height);

    const backgroundLayer1 = new Image();
    backgroundLayer1.src = './images/background/10-Sky.png';

    const backgroundLayer2 = new Image();
    backgroundLayer2.src = './images/background/09-Forest.png';

    const backgroundLayer3 = new Image();
    backgroundLayer3.src = './images/background/forrest-layer-2.png';

    const backgroundLayer4 = new Image();
    backgroundLayer4.src = './images/background/07-Forest.png';

    const backgroundLayer5 = new Image();
    backgroundLayer5.src = './images/background/06-Forest.png';

    const backgroundLayer6 = new Image();
    backgroundLayer6.src = './images/background/05-Particles.png';

    const backgroundLayer7 = new Image();
    backgroundLayer7.src = './images/background/04-Forest.png';

    const backgroundLayer8 = new Image();
    backgroundLayer8.src = './images/background/forrest-layer-4.png';

    const backgroundLayer9 = new Image();
    backgroundLayer9.src = './images/background/forrest-layer-5.png';

    const backgroundLayer10 = new Image();
    backgroundLayer10.src = './images/background/forrest-layer-5.png';

    const backgroundLayer11 = new Image();
    backgroundLayer11.src = './images/background/11-forrest-grass.png';

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 1600;
            this.height = 710;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = this.width + this.x2 - this.speed;
            }
            if (this.x2 <= -this.width) {
                this.x2 = this.width + this.x - this.speed;
            }
            this.x = Math.floor(this.x - this.speed);
            this.x2 = Math.floor(this.x2 - this.speed);
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
    }

    const layer1 = new Layer(backgroundLayer1, 0);
    const layer2 = new Layer(backgroundLayer2, 0.2);
    const layer3 = new Layer(backgroundLayer3, 0.4);
    const layer4 = new Layer(backgroundLayer4, 0.6);
    const layer5 = new Layer(backgroundLayer5, 0.8);
    const layer6 = new Layer(backgroundLayer6, 1);
    const layer7 = new Layer(backgroundLayer7, 1.5);
    const layer8 = new Layer(backgroundLayer8, 1.7);
    const layer9 = new Layer(backgroundLayer9, 1.9);
    const layer10 = new Layer(backgroundLayer10, 2);
    const layer11 = new Layer(backgroundLayer11, 2.5);

    const layerObjects = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10, layer11];

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (game.player.currentState instanceof Sitting) {
            gameSpeed = 0; // Set gameSpeed to 0 when the player is sitting
        } else {
            gameSpeed = 2; // Set the game speed back to its original value in other states
        }

        layerObjects.forEach(object => {
            object.update();
            object.draw();
        });

        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});