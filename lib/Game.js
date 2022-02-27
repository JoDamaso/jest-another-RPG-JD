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

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats as follows:');
    console.table(this.player.getStats());
    console.table(this.currentEnemy.getDescription());
    this.battle();
};

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        // player prompts will go here
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {  
                if (action === 'Use potion') {
                    // follow-up prompt will go here
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You use a ${potionDetails[1]} potion.`);
                        })
                } 
                else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } 
    else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};


// exporting the Game function to anywhere we require() it
module.exports = Game;