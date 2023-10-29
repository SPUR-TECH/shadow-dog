export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = 0;
        this.touchX = 0;
        this.swipeThreshold = 50;

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
                if (this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                } else if (e.key === 'd') this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        window.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.targetTouches.length >= 2) {
                this.keys.push('Enter');
            } else {
                this.touchY = e.changedTouches[0].pageY;
                this.touchX = e.changedTouches[0].pageX;
            }
        });

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const swipeYDistance = e.changedTouches[0].pageY - this.touchY;
            const swipeXDistance = e.changedTouches[0].pageX - this.touchX;

            if (swipeYDistance < -this.swipeThreshold && this.keys.indexOf('swipe up') === -1) {
                this.keys.push('swipe up');
            } else if (swipeYDistance > this.swipeThreshold && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
            }
            if (swipeXDistance < -this.swipeThreshold && this.keys.indexOf('swipe left') === -1) {
                this.keys.push('swipe left');
            } else if (swipeXDistance > this.swipeThreshold && this.keys.indexOf('swipe right') === -1) {
                this.keys.push('swipe right');
            }
        });

        window.addEventListener('touchend', (e) => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            this.keys.splice(this.keys.indexOf('Enter'), 1);
        });

        window.addEventListener('touchcancel', (e) => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            this.keys.splice(this.keys.indexOf('Enter'), 1);
        });
    }
}