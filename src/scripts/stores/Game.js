const immutable = require('alt/utils/ImmutableUtil');
const {Map} = require('immutable');

const alt = require('../altInstance');
const FieldActions = require('../actions/Field');
const GameActions = require('../actions/Game');
const {MAX_SIZE} = require('../components/grid/GridSize');

const GameStore = alt.createStore(immutable({displayName: 'GameStore',
  bindListeners: {
    onCreateFieldFor: FieldActions.createFieldFor,
    onPlaceShipsFor: FieldActions.placeShipsFor,
    onUpdateCell: FieldActions.updateCell,
    onTurnOver: GameActions.turnOver,
    onExpectedShipCount: GameActions.expectedShipCount,
    onGameStateChange: GameActions.gameStateChange,
  },

  state: new Map({
    playerOne: new Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
      shipCount: 0,
    }),
    playerTwo: new Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
      shipCount: 0,
    }),
    gameRunning: false,
    activeBoard: 'playerTwo',
    size: MAX_SIZE,
    expectedShipCount: 0,
  }),

  onCreateFieldFor: function(playerField) {
    const {player, grid} = playerField;
    this.setState(this.state
      .set('size', grid.length)
      .setIn([player, 'field'], grid));
  },

  onPlaceShipsFor: function(playerShips) {
    const {player, grid, ships} = playerShips;
    this.setState(this.state
      .update('expectedShipCount', function(value) {
        return value > ships.length ? ships.length : value;
      })
      .setIn([player, 'shipCount'], ships.length)
      .setIn([player, 'ships'], ships)
      .setIn([player, 'field'], grid));
  },

  onUpdateCell: function(cellInfo) {
    const player = this.state.get('activeBoard');
    const {cell, row, col} = cellInfo;
    this.setState(this.state.updateIn([player, 'field'], function(grid) {
      grid[row][col] = cell;
      return grid;
    }));
  },

  onTurnOver: function() {
    this.setState(this.state.update('activeBoard', function(current) {
      return current === 'playerOne' ? 'playerTwo' : 'playerOne';
    }));
  },

  onExpectedShipCount: function(count) {
    this.setState(this.state.set('expectedShipCount', count));
  },

  onGameStateChange: function(state) {
    this.setState(this.state.set('gameRunning', state));
  },
}));

module.exports = GameStore;
