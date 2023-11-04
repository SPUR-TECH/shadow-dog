export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster'
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffSetY = 2;
        context.shadowColor = 'red';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // Score
        context.fillText('Score: ' + this.game.score, 20, 50);
        //  Timer
        context.font = this.fontSize * 0.8 + ' px' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        context.restore();
        // Game over message
        if (this.game.gameOver) {
            context.shadowOffsetX = 2;
            context.shadowOffSetY = 2;
            context.shadowColor = 'yellow';
            context.shadowBlur = 0;
            context.textAlign = 'center';
            context.font = this.fontSize * 4 + 'px ' + this.fontFamily;
            context.fillStyle = 'red'
            if (this.game.score > 5) {
                context.fillText('Sweet !!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('You did it congratulations !!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.font = this.fontSize * 4 + 'px ' + this.fontFamily;
                context.fillText('Unlucky !!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('Better luck next time !!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}