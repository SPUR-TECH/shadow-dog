export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys)
        });

        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys)
        });
    }
}





// this.touchStartX = 0;
// this.touchStartY = 0;
// this.touchThreshold = 30;
// this.player = player;

// window.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && gameOver) restartGame();
//     this.keys.add(e.key);
//     this.handleKeyPresses();
// });

// window.addEventListener('keyup', (e) => {
//     this.keys.delete(e.key);
//     this.handleKeyPresses();
// });

// window.addEventListener('touchstart', (e) => {
//     this.touchStartX = e.changedTouches[0].pageX;
//     this.touchStartY = e.changedTouches[0].pageY;
// });

// window.addEventListener('touchmove', (e) => {
//     e.preventDefault();
//     const touchX = e.changedTouches[0].pageX;
//     const touchY = e.changedTouches[0].pageY;
//     const deltaX = touchX - this.touchStartX;
//     const deltaY = touchY - this.touchStartY;

//     if (Math.abs(deltaX) > this.touchThreshold) {
//         if (deltaX < 0) {
//             this.keys.add('ArrowLeft');
//             this.keys.delete('ArrowRight');
//         } else {
//             this.keys.add('ArrowRight');
//             this.keys.delete('ArrowLeft');
//         }
//     } else {
//         this.keys.delete('ArrowLeft');
//         this.keys.delete('ArrowRight');
//     }

//     if (deltaY < -this.touchThreshold && this.player.onGround(enemies)) {
//         this.keys.add('ArrowUp');
//     } else if (deltaY > this.touchThreshold) {
//         this.keys.add('ArrowDown');
//     } else {
//         this.keys.delete('ArrowUp');
//         this.keys.delete('ArrowDown');
//     }

//     this.handleKeyPresses();
// });

// window.addEventListener('touchend', (e) => {
//     this.keys.delete('ArrowLeft');
//     this.keys.delete('ArrowRight');
//     this.keys.delete('ArrowUp');
//     this.keys.delete('ArrowDown');
//     this.handleKeyPresses();

//     if (gameOver) {
//         // Check for a swipe down gesture only when the game is over
//         const touchEndY = e.changedTouches[0].pageY;
//         const deltaY = touchEndY - this.touchStartY;
//         if (deltaY > this.touchThreshold) {
//             restartGame(); // Call the restartGame function on swipe down if game over
//         }
//     }
// });