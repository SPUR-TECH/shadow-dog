export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // Delete enemy when off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 66.66;
        this.height = 47;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 4;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('bat-3')
        this.angle = 0;
        this.va = Math.random() * 0.2 + 0.3;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 125;
        this.height = 176;
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.speedX = this.game.speed;
        this.speedY = 0
        this.maxFrame = 7;
        this.image = document.getElementById('zombie')
    }
}

export class ClimbingEnemy extends Enemy {


}