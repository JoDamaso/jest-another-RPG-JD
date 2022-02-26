const Player = require('../lib/Player');
const Potion = require('../lib/Potion.js');
// const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');


test('creates a player object', () => {
    const player = new Player('Darryl');

    expect(player.name).toBe('Darryl');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// gets player's stats and saves as an object using .toHaveProperty()
test("gets player's stats as an object", () => {
    const player = new Player('Darryl');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});


// gets inventory and uses an array .toEqual()
test('gets inventory from player or returns false', () => {
    const player = new Player('Darryl');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});


// gets players health while using .toEqual and expecting a string 
test("gets player's health value", () => {
    const player = new Player('Darryl');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// checks if alive or not truth or falsy, using player.health in the middle to check the false
test('checks if player is alive or not', () => {
    const player = new Player('Darryl');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0

    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player('Darryl');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

// testing to get player's attack 
test("gets player's attack value", () => {
    const player = new Player('Darryl');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// testing to see if the potions was added corrently
test('adds a potion to the inventory', () => {
    const player = new Player('Darryl');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player('Darryl');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});