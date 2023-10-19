export class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

    }
    update() {

    }
    draw() {

    }
}

class FlyingEnemy extends Enemy {

}

class GroundEnemy extends Enemy {

}

class ClimbingEnemy extends Enemy {


}