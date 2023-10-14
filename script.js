import {
    Player
} from './player.js '
import {
    InputHandler
} from './inputHandler.js'

window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;
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
            this.player = new Player(this);
            this.InputHandler = new InputHandler();
        }
        update() {
            this.player.update();
        }
        draw(ctx) {
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});