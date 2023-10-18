import {
    Player
} from './player.js';

export class InputHandler {
    constructor() {
        this.keys = [];
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.swipeThreshold = 50;
        this.canJump = true;

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

        window.addEventListener('touchstart', (e) => {
            this.touchStartY = e.changedTouches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            const swipeDistance = this.touchStartY - this.touchEndY;

            if (swipeDistance > this.swipeThreshold && this.canJump) {
                this.keys.push('ArrowUp');
                this.canJump = false;
                setTimeout(() => {
                    this.keys = this.keys.filter((key) => key !== 'ArrowUp');
                    this.canJump = true;
                }, 100);
            } else if (swipeDistance < -this.swipeThreshold) {
                this.keys.push('ArrowDown');
            }
        });
    }
}