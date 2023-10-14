// Video 1 setup and player.....https://www.youtube.com/watch?v=c-1dBd1_G8A&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=12
// Video 2 state control .....https://www.youtube.com/watch?v=ug-gdfGb7I8&list=PLYElE_rzEw_uryBrrzu2E626MY4zoXvx2&index=13

import {
    Player
} from './player.js '
import {
    InputHandler
} from './inputHandler.js'
// import {
//     Background
// } from './background.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1600;
    canvas.height = 710;
    // let enemies = [];
    // let score = 0;
    // let gameOver = false;
    // let gameSpeed = 2;
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
            this.speed = 3;
            // this.Background = new Background(this);
            this.player = new Player(this);
            this.InputHandler = new InputHandler();
        }
        update(deltaTime) {
            // this.Background.update();
            this.player.update(this.InputHandler.keys, deltaTime);
        }
        draw(ctx) {
            // this.Background.draw(ctx);
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});