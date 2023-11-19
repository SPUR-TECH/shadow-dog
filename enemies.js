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
		// Movement
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
		// context.lineWidth = 5;
		// context.strokeStyle = 'white'
		// context.beginPath()
		// context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2)
		// context.stroke()
		context.drawImage(
			this.image,
			this.frameX * this.width,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height,
		);
	}
}

export class BatEnemy extends Enemy {
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
		this.image = document.getElementById("bat-3");
		this.angle = 0;
		this.va = Math.random() * 0.2 + 0.3;
	}
	update(deltaTime) {
		super.update(deltaTime);
		this.angle += this.va;
		this.y += 2 * Math.sin(this.angle);
	}
}

export class GhostEnemy3 extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 87.33;
		this.height = 70;
		this.x = this.game.width + Math.random() * this.game.width * 0.5;
		this.y = Math.random() * this.game.height * 0.5;
		this.speedX = Math.random() + 4;
		this.speedY = 0;
		this.maxFrame = 5;
		this.image = document.getElementById("ghost-3");
		this.angle = 0;
		this.va = Math.random() * 0.1 + 0.01;
	}
	update(deltaTime) {
		super.update(deltaTime);
		this.angle += this.va;
		this.y += 5 * Math.sin(this.angle);
	}

	draw(ctx) {
		ctx.globalAlpha = 0.5;
		super.draw(ctx);
		ctx.globalAlpha = 1;
	}
}

export class RavenEnemy extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 100;
		this.height = 72;
		this.x = this.game.width + Math.random() * this.game.width * 0.5;
		this.y = Math.random() * this.game.height * 0.5;
		this.speedX = Math.random() + 4;
		this.speedY = 0;
		this.maxFrame = 5;
		this.image = document.getElementById("raven");
		this.angle = 0;
		this.va = Math.random() * 0.1 + 0.1;
	}
	update(deltaTime) {
		super.update(deltaTime);
		this.angle += this.va;
		this.y += Math.sin(this.angle);
	}
}

export class WalkingZombie extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 125;
		this.height = 176;
		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.speedX = 0.5;
		this.speedY = 0;
		this.maxFrame = 7;
		this.image = document.getElementById("zombie");
	}
}

export class GroundZombie extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 120.12;
		this.height = 90;
		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.speedX = 0;
		this.speedY = 0;
		this.maxFrame = 7;
		this.image = document.getElementById("ground-zombie");
	}
}

export class ClimbingEnemy extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 120;
		this.height = 144;
		this.x = this.game.width;
		this.y = Math.random() * this.game.height * 0.5;
		this.image = document.getElementById("spider");
		this.speedX = 0;
		this.speedY = Math.random() > 0.5 ? 1 : -1;
		this.maxFrame = 5;
	}
	update(deltaTime) {
		super.update(deltaTime);
		if (this.y > this.game.height - this.height - this.game.groundMargin)
			this.speedY *= -1;
		if (this.y < -this.height) this.markedForDeletion = true;
	}
	draw(context) {
		super.draw(context);
		context.beginPath();
		context.moveTo(this.x + this.width / 2, 0);
		context.lineTo(this.x + this.width / 2, this.y + 50);
		context.stroke();
		context.strokeStyle = "white";
	}
}
