const alt = require('../altInstance');

const FieldActions = require('./Field');

const GameActions = alt.createActions({displayName: 'GameActions',
  turnOver: function() {
    return;
  },

  setupBoard: function(size) {
    return {
      playerOne: FieldActions.createFieldFor('playerOne', size),
      playerTwo: FieldActions.createFieldFor('playerTwo', size),
    };
  },

  setupShips: function(boardSize, count) {
    const {playerOne, playerTwo} = this.actions.setupBoard(boardSize);
    return {
      playerOne: FieldActions.placeShipsFor(playerOne.player, playerOne.grid, count),
      playerTwo: FieldActions.placeShipsFor(playerTwo.player, playerTwo.grid, count),
    };
  },
});

module.exports = GameActions;
