export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster'
        this.liveImage = document.getElementById('lives');
    }
    draw(context) {
        // Score
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = 'red';
        context.fillText('Score: ' + this.game.score, 20, 50);
        context.fillStyle = 'yellow';
        context.fillText('Score: ' + this.game.score, 24, 54)

        //  Timer
        context.font = this.fontSize * 0.8 + ' px' + this.fontFamily;
        context.fillStyle = 'red';
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        context.fillStyle = 'yellow';
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 24, 84);

        // Energy
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillStyle = 'red';
        context.fillText('Energy: ' + this.game.energy, 20, 110);
        context.fillStyle = 'yellow';
        context.fillText('Energy: ' + this.game.energy, 24, 114);

        // Lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.liveImage, 30 * i + 20, 130, 30, 30);
        }

        // Game over message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 6 + 'px ' + this.fontFamily;

            if (this.game.score > this.game.winningScore) {
                context.fillStyle = 'black'
                context.fillText('Sweet !!', this.game.width * 0.5, this.game.height * 0.5 - 22);
                context.fillStyle = 'red'
                context.fillText('Sweet !!', this.game.width * 0.5 + 8, this.game.height * 0.5 - 16);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillStyle = 'black'
                context.fillText('You did it congratulations !!', this.game.width * 0.5 + 4, this.game.height * 0.5 + 30);
                context.fillStyle = 'red'
                context.fillText('You did it congratulations !!', this.game.width * 0.5 + 4, this.game.height * 0.5 + 34);
            } else {
                context.fillStyle = 'black'
                context.fillText('Unlucky !!', this.game.width * 0.5, this.game.height * 0.5 - 22);
                context.fillStyle = 'red'
                context.fillText('Unlucky !!', this.game.width * 0.5 + 8, this.game.height * 0.5 - 16);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillStyle = 'black'
                context.fillText('Better luck next time !!', this.game.width * 0.5, this.game.height * 0.5 + 30);
                context.fillStyle = 'red'
                context.fillText('Better luck next time !!', this.game.width * 0.5 + 4, this.game.height * 0.5 + 34);
            }
        }
    }
}