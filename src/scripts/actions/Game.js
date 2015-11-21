import alt from '../altInstance';

import FieldActions from './Field';

const GameActions = alt.createActions({displayName: 'GameActions',
  gameStart: function() {
    return true;
  },

  gameOver: function(time) {
    return time;
  },

  turnOver: function() {
    return true;
  },

  expectedShipCount: function(count) {
    return count;
  },

  setGameTime: function(time) {
    return time;
  },

  setupBoard: function(size) {
    return {
      playerOne: FieldActions.createFieldFor('playerOne', size),
      playerTwo: FieldActions.createFieldFor('playerTwo', size),
    };
  },

  setupShips: function(boardSize, count) {
    const {playerOne, playerTwo} = this.actions.setupBoard(boardSize);
    this.actions.expectedShipCount(count);
    return {
      playerOne: FieldActions.placeShipsFor(playerOne.player, playerOne.grid, count),
      playerTwo: FieldActions.placeShipsFor(playerTwo.player, playerTwo.grid, count),
    };
  },
});

module.exports = GameActions;
