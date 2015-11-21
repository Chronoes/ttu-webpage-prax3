import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import FieldActions from '../actions/Field';
import GameActions from '../actions/Game';
import {MAX_SIZE} from '../components/grid/GridSize';

const GameStore = alt.createStore(immutable({displayName: 'GameStore',
  bindListeners: {
    onCreateFieldFor: FieldActions.createFieldFor,
    onPlaceShipsFor: FieldActions.placeShipsFor,
    onUpdateCell: FieldActions.updateCell,
    onTurnOver: GameActions.turnOver,
    onExpectedShipCount: GameActions.expectedShipCount,
    onGameStart: GameActions.gameStart,
    onGameOver: GameActions.gameOver,
  },

  state: Map({
    playerOne: Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
      health: 0,
    }),
    playerTwo: Map({
      field: FieldActions.createField(MAX_SIZE),
      ships: [],
      health: 0,
    }),
    gameRunning: false,
    activeBoard: 'playerTwo',
    size: MAX_SIZE,
    expectedShipCount: 0,
    winner: '',
    gameTime: 0,
  }),

  onCreateFieldFor: function(playerField) {
    const {player, grid} = playerField;
    this.setState(this.state
      .set('size', grid.length)
      .setIn([player, 'field'], grid)
      .set('gameRunning', false)
      .set('activeBoard', 'playerTwo')
      .set('winner', '')
      .set('expectedShipCount', 0)
      .set('gameTime', 0));
  },

  onPlaceShipsFor: function(playerShips) {
    const {player, grid, ships} = playerShips;
    this.setState(this.state
      .update('expectedShipCount', function(value) {
        return value > ships.length ? ships.length : value;
      })
      .setIn([player, 'health'], ships.length * 2)
      .setIn([player, 'ships'], ships)
      .setIn([player, 'field'], grid));
  },

  onUpdateCell: function(cellInfo) {
    const player = this.state.get('activeBoard');
    const {cell, row, col, shipHit} = cellInfo;
    this.setState(this.state
      .updateIn([player, 'health'], function(value) {
        return shipHit ? value - 1 : value;
      })
      .updateIn([player, 'field'], function(grid) {
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

  onGameStart: function() {
    this.setState(this.state
      .set('gameRunning', this.state.get('expectedShipCount') > 0)
      .set('winner', ''));
  },

  onGameOver: function(time) {
    this.setState(this.state
      .set('gameRunning', false)
      .set('winner', this.state.get('activeBoard') === 'playerOne' ? 'playerTwo' : 'playerOne')
      .set('gameTime', time));
  },
}));

module.exports = GameStore;
