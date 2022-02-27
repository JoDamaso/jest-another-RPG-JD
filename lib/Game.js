//modules we are using/requiring
const inquirer = require('inquirer')
const Enemy = require('./Enemy')
const Player = require('./Player')

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

};

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('anna', 'sharp nails'));
    this.enemies.push(new Enemy('aiko', 'razor teeth'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            //test the object creation // starts new battle after player creation
            this.startNewBattle();
        });
};



// exporting the Game function to anywhere we require() it
module.exports = Game;