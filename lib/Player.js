//import
const Potion = require('../lib/Potion');

// constructor
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

    // returns players health in a string
    Player.prototype.getHealth = function () {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // returns an object with various player properties
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory
        }
        return false;
    };

    // 
    Player.prototype.isAlive = function() {
        // if not 0, return true
        if (this.health === 0) {
            return false;
        }
        return true;
    };
    
    // reduces health 
    Player.prototype.reduceHealth = function(health) {
        this.health -= health;
        // Remember to include the conditional to ensure the health never goes negative.
        if (this.health < 0) {
            this.health = 0;
        }
    };

    // method to get attackvalue
    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;
    
        return Math.floor(Math.random() * (max - min) + min);
    };

    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    Player.prototype.usePotion = function(index) {
        const potion = this.getInventory().splice(index, 1)[0];
    
        switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
        }
    };
    
};

module.exports = Player;