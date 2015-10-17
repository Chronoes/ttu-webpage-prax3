const immutable = require('alt/utils/ImmutableUtil');
const {Map} = require('immutable');

const alt = require('../altInstance');
const FieldActions = require('../actions/Field');
const GameActions = require('../actions/Game');
const utilGrid = require('../util/grid');
const {MAX_SIZE} = require('../components/grid/GridSize');

const GameStore = alt.createStore(immutable({displayName: 'GameStore',
  bindListeners: {
    onCreateFieldFor: FieldActions.createFieldFor,
    onPlaceShipsFor: FieldActions.placeShipsFor,
    onUpdateCell: FieldActions.updateCell,
    onTurnOver: GameActions.turnOver,
  },

  state: new Map({
    playerOne: new Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
    }),
    playerTwo: new Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
    }),
    activeBoard: 'playerTwo',
    size: MAX_SIZE,
    shipCount: 0,
  }),

  onCreateFieldFor: function(playerField) {
    const {player, grid} = playerField;
    this.setState(this.state
      .set('size', grid.length)
      .setIn([player, 'field'], grid));
  },

  onPlaceShipsFor: function(playerShips) {
    const {player, ships} = playerShips;
    this.setState(this.state
      .setIn([player, 'shipCount'], ships.length)
      .setIn([player, 'ships'], ships)
      .updateIn([player, 'field'], utilGrid.updateGridWithShips.bind(null, ships)));
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
    const current = this.state.get('activeBoard');
    this.setState(this.state.set('activeBoard', current === 'playerOne' ? 'playerTwo' : current));
  },
}));

module.exports = GameStore;
