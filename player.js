export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 100;
        this.y = this.game.height - this.height;
        this.image = player; // Player ID
        // this.image = document.getElementById('playerImage');
        // this.frameX = 0;
        // this.frameY = 0;
        // this.maxFrame = 8;
        // this.fps = 20;
        // this.frameTimer = 0;
        // this.frameInterval = 1000 / this.fps;
        // this.speed = 0;
        // this.vy = 0;
        // this.gravity = 1;
        // this.jumping = false;
    }
    update() {
        this.x++
    }
    draw(ctx) {
        // ctx.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}