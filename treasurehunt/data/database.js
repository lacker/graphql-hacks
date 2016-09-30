

// Model types
export class Game {}
export class HidingSpot {}

// Use a singleton game
const game = new Game();
game.id = '1';

let hidingSpots;
let turnsRemaining;

export function playAgain() {
  turnsRemaining = 3;
  hidingSpots = [];
  const indexOfSpotWithTreasure = Math.floor(Math.random() * 9);
  for (let i = 0; i < 9; i++) {
    let hidingSpot = new HidingSpot();
    hidingSpot.id = `${i}`;
    hidingSpot.hasTreasure = (i === indexOfSpotWithTreasure);
    hidingSpot.hasBeenChecked = false;
    hidingSpots.push(hidingSpot);
  }
}
playAgain();

export function checkHidingSpotForTreasure(id) {
  if (hidingSpots.some(hs => hs.hasTreasure && hs.hasBeenChecked)) {
    return;
  }
  turnsRemaining--;
  const hidingSpot = getHidingSpot(id);
  hidingSpot.hasBeenChecked = true;
}

export function getHidingSpot(id) {
  return hidingSpots.find(hs => hs.id === id);
}

export function getGame() { return game; }
export function getHidingSpots() { return hidingSpots; }
export function getTurnsRemaining() { return turnsRemaining; }
