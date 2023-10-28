import {
    Dust
} from './particles.js'

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVE: 5,
    HIT: 6,
    DEAD: 7,

};

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}
export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        this.game.player.isSitting = true;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('swipe left') || input.includes('swipe right') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUNNING);
        } else if (input.includes('ArrowUp') || input.includes('swipe up')) {
            this.game.player.setState(states.JUMPING);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 3;
        this.game.player.isSitting = true;
    }
    handleInput(input) {
        this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5 + 15, this.game.player.y + this.game.player.height));
        if (input.includes('ArrowDown') || input.includes('swipe down')) {
            this.game.player.setState(states.SITTING);
        } else if (input.includes('ArrowUp') || input.includes('swipe up')) {
            this.game.player.setState(states.JUMPING);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 31

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
        this.game.player.isSitting = false;
    }
    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
        this.game.player.isSitting = false;

    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.isSitting = false;
    }
    handleInput(input) {
        if (!input.includes('Enter', 'swipe up', 'swipe down') && this.game.player.onGround) {
            this.game.player.setState(states.RUNNING);
        } else if (!input.includes('Enter', 'swipe up', 'swipe down') && !this.game.player.onGround) {
            this.game.player.setState(states.FALLING);
        } else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 32;
        } else if (input.includes('Enter') && input.includes('swipe up') && this.game.player.onGround()) {
            this.game.player.vy -= 32;
        }
    }
}

// export class Dive extends State {
//     constructor(player) {
//         super('DIVE');
//         this.player = player;
//     }
//     enter() {
//         this.player.frameX = 0;
//         this.player.maxFrame = 6;
//         this.player.frameY = 6;
//         this.player.isSitting = false;
//     }
//     handleInput(input) {
//         if (input.includes('Enter')) {
//             this.player.setState(states.ROLLING);
//         } else if (input.includes('ArrowUp') || input.includes('swipe up')) {
//             this.player.setState(states.JUMPING);
//         } else if (input.includes('ArrowDown') || input.includes('swipe down')) {
//             this.player.setState(states.SITTING);
//         } else if (input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('swipe left') || input.includes('swipe right') && this.player.onGround()) {
//             this.player.setState(states.RUNNING);
//         }
//     }
// }