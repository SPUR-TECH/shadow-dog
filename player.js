export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 100;
        this.y = this.game.height - this.height;
        this.image = player; // Player ID
        this.speed = 0;
        this.maxSpeed = 5;

        // this.image = document.getElementById('playerImage');
        // this.frameX = 0;
        // this.frameY = 0;
        // this.maxFrame = 8;
        // this.fps = 20;
        // this.frameTimer = 0;
        // this.frameInterval = 1000 / this.fps;
        // 
        // this.vy = 0;
        // this.gravity = 1;
        // this.jumping = false;
    }
    update(input) {
        // Horizontal movements
        this.x += this.speed;

        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    }
    draw(ctx) {
        // ctx.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}