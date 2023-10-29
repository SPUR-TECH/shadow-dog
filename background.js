class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;

        // this.x2 = this.width;
        // this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        if (this.x < -this.width) this.x = 0;
        else(this.x -= this.game.speed * this.speedModifier);
        //     this.x = this.width + this.x2 - this.speed;
        // }
        // if (this.x2 <= -this.width) {
        //     this.x2 = this.width + this.x - this.speed;
        // }
        // this.x = Math.floor(this.x - this.speed);
        // this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1600;
        this.height = 710;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        this.layer5image = document.getElementById('layer5');
        this.layer6image = document.getElementById('layer6');
        this.layer7image = document.getElementById('layer7');
        this.layer8image = document.getElementById('layer8');
        this.layer9image = document.getElementById('layer9');
        this.layer10image = document.getElementById('layer10');
        this.layer11image = document.getElementById('layer11');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.1, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.2, this.layer3image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.3, this.layer4image);
        this.layer5 = new Layer(this.game, this.width, this.height, 0.4, this.layer5image);
        this.layer6 = new Layer(this.game, this.width, this.height, 0.5, this.layer6image);
        this.layer7 = new Layer(this.game, this.width, this.height, 0.6, this.layer7image);
        this.layer8 = new Layer(this.game, this.width, this.height, 0.7, this.layer8image);
        this.layer9 = new Layer(this.game, this.width, this.height, 0.8, this.layer9image);
        this.layer10 = new Layer(this.game, this.width, this.height, 1, this.layer10image);
        this.layer11 = new Layer(this.game, this.width, this.height, 1.2, this.layer11image);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7, this.layer8, this.layer9, this.layer10, this.layer11];
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}