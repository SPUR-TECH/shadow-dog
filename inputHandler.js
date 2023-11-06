export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.rollButtonPressed = false;

        const roll = document.getElementById("roll-button");
        const jump = document.getElementById("up-button-image");
        const right = document.getElementById("right-button-image");
        const sit = document.getElementById("down-button-image");
        const left = document.getElementById("left-button-image");

        const handleTouchStart = (e, key) => {
            this.keys.push(key);
            if (key === 'Enter') {
                this.rollButtonPressed = true;
            }
        };

        const handleTouchEnd = (key) => {
            this.keys.splice(this.keys.indexOf(key), 1);
            if (key === 'Enter') {
                this.rollButtonPressed = false;
            }
        };

        roll.addEventListener("touchstart", (e) => handleTouchStart(e, 'Enter'));
        roll.addEventListener("touchend", () => handleTouchEnd('Enter'));
        roll.addEventListener("touchcancel", () => handleTouchEnd('Enter'));

        jump.addEventListener("touchstart", (e) => handleTouchStart(e, 'ArrowUp'));
        jump.addEventListener("touchend", () => handleTouchEnd('ArrowUp'));
        jump.addEventListener("touchcancel", () => handleTouchEnd('ArrowUp'));

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