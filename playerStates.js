import {
    Dust,
    Fire,
    Splash
} from './particles.js'

export const states = {
    IDLE: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    ROLLING: 5,
    DIVING: 6,
    HIT: 7,
    DEAD: 8,
    BITE: 9,
};
export class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State {
    constructor(game) {
        super('IDLE', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 0;
        this.game.player.vy = 0;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
                this.game.player.setState(states.RUNNING, 1);
            } else if (input.includes('ArrowDown')) {
                this.game.player.setState(states.SITTING, 0);
            } else if (input.includes('ArrowUp')) {
                this.game.player.setState(states.JUMPING, 1);
            } else if (input.includes('Enter') && this.game.energy > 1) {
                this.game.player.setState(states.ROLLING, 2);
            } else if (input.includes('b')) {
                this.game.player.setState(states.BITE, 2);
            }
        }
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
        this.game.player.vy = 0;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
                this.game.player.setState(states.RUNNING, 1);
            } else if (input.includes('ArrowUp')) {
                this.game.player.setState(states.JUMPING, 1);
            } else if (input.includes('Enter') && this.game.energy > 1) {
                this.game.player.setState(states.ROLLING, 2);
            } else if (input.includes('b')) {
                this.game.player.setState(states.BITE, 2);
            }
        }
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }

    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5 + 20, this.game.player.y + this.game.player.height));
        if (input.includes('ArrowDown')) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes('Enter') && this.game.energy > 1) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('b')) {
            this.game.player.setState(states.BITE, 2);
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
    }
    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('Enter') && this.game.energy > 1) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('ArrowDown')) {
            this.game.player.setState(states.DIVING, 0);
        } else if (input.includes('b')) {
            this.game.player.setState(states.BITE, 2);
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
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('Enter') && this.game.energy > 1) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('ArrowDown')) {
            this.game.player.setState(states.DIVING, 0);
        } else if (input.includes('b')) {
            this.game.player.setState(states.BITE, 2);
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
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (!input.includes('Enter') && this.game.player.onGround) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('Enter') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 32;
        } else if (input.includes('Enter') && input.includes('ArrowDown') && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('Enter') && input.includes('ArrowDown') && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super('DIVING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 25;
    }
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.3, this.game.player.y + this.game.player.height));
            }

        } else if (input.includes('Enter') && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Hit extends State {
    constructor(game) {
        super('HIT', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    }
    handleInput(input) {

        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);

        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}

export class Dead extends State {
    constructor(game) {
        super('DEAD', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 11;
        this.game.player.frameY = 8;
    }
    handleInput(input) {

        if (this.game.player.frameX >= 11 && this.game.player.onGround()) {
            this.game.player.frameX === 11
            this.game.player.setState(states.DEAD, 1);

        } else if (this.game.player.frameX >= 11 && !this.game.player.onGround()) {
            this.game.player.frameX === 11
            this.game.player.setState(states.DEAD, 1);
        }
    }
}

export class Bite extends State {
    constructor(game) {
        super('BITE', game);
        this.biteTriggered = false;
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 7;
    }

    handleInput(input) {
        if (input.includes('b')) {
            if (!this.biteTriggered) {
                if (this.game.player.onGround) {
                    this.game.player.setState(states.BITE, 2);
                }
                this.biteTriggered = true;
            }
        } else {
            this.biteTriggered = false;
        }

        if (!input.includes('b') && this.game.player.onGround) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('b') && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}