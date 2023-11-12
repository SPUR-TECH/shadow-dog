export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.rollButtonPressed = false;

        const roll = document.getElementById("roll");
        const jump = document.getElementById("up");
        const forwardJump = document.getElementById("up-right");
        const backwardJump = document.getElementById("left-up");
        const right = document.getElementById("right");
        const sit = document.getElementById("down");
        const left = document.getElementById("left");

        const handleTouchStart = (e, keys) => {
            if (Array.isArray(keys)) {
                keys.forEach(key => {
                    this.keys.push(key);
                    if (key === 'Enter') {
                        this.rollButtonPressed = true;
                    }
                });
            } else {
                this.keys.push(keys);
                if (keys === 'Enter') {
                    this.rollButtonPressed = true;
                }
            }
        };

        const handleTouchEnd = (keys) => {
            if (Array.isArray(keys)) {
                keys.forEach(key => {
                    this.keys.splice(this.keys.indexOf(key), 1);
                    if (key === 'Enter') {
                        this.rollButtonPressed = false;
                    }
                });
            } else {
                this.keys.splice(this.keys.indexOf(keys), 1);
                if (keys === 'Enter') {
                    this.rollButtonPressed = false;
                }
            }
        };

        document.querySelector('#startButton').addEventListener('click', () => {
            if (!this.game.gameStarted) {
                this.game.gameStarted = true;
                document.querySelector('#startButton').style.display = 'none';
                document.querySelector('#instructions-button').style.display = 'none';
                if (this.game.gameOver) {
                    this.game.backgroundSound.stop();
                }
            }
        });

        document.querySelector('#restartButton').addEventListener('click', () => {
            if (this.game.gameOver) {
                this.game.resetGame();
                document.querySelector('#restartButton').style.display = 'none';
                document.querySelector('#instructions-button').style.display = 'none';
                this.game.backgroundSound.play();
            }
        });

        roll.addEventListener("touchstart", (e) => handleTouchStart(e, 'Enter'));
        roll.addEventListener("touchend", () => handleTouchEnd('Enter'));
        roll.addEventListener("touchcancel", () => handleTouchEnd('Enter'));

        jump.addEventListener("touchstart", (e) => handleTouchStart(e, 'ArrowUp'));
        jump.addEventListener("touchend", () => handleTouchEnd('ArrowUp'));
        jump.addEventListener("touchcancel", () => handleTouchEnd('ArrowUp'));

        forwardJump.addEventListener("touchstart", (e) => handleTouchStart(e, ['ArrowUp', 'ArrowRight']));
        forwardJump.addEventListener("touchend", () => handleTouchEnd(['ArrowUp', 'ArrowRight']));
        forwardJump.addEventListener("touchcancel", () => handleTouchEnd(['ArrowUp', 'ArrowRight']));

        backwardJump.addEventListener("touchstart", (e) => handleTouchStart(e, ['ArrowUp', 'ArrowLeft']));
        backwardJump.addEventListener("touchend", () => handleTouchEnd(['ArrowUp', 'ArrowLeft']));
        backwardJump.addEventListener("touchcancel", () => handleTouchEnd(['ArrowUp', 'ArrowLeft']));

        right.addEventListener("touchstart", (e) => handleTouchStart(e, 'ArrowRight'));
        right.addEventListener("touchend", () => handleTouchEnd('ArrowRight'));
        right.addEventListener("touchcancel", () => handleTouchEnd('ArrowRight'));

        sit.addEventListener("touchstart", (e) => handleTouchStart(e, 'ArrowDown'));
        sit.addEventListener("touchend", () => handleTouchEnd('ArrowDown'));
        sit.addEventListener("touchcancel", () => handleTouchEnd('ArrowDown'));

        left.addEventListener("touchstart", (e) => handleTouchStart(e, 'ArrowLeft'));
        left.addEventListener("touchend", () => handleTouchEnd('ArrowLeft'));
        left.addEventListener("touchcancel", () => handleTouchEnd('ArrowLeft'));

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
                if (this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}