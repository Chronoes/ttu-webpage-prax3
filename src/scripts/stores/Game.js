import immutable from 'alt/utils/ImmutableUtil';
import {Map} from 'immutable';

import alt from '../altInstance';
import FieldActions from '../actions/Field';
import GameActions from '../actions/Game';
import {MAX_SIZE} from '../components/grid/GridSize';

@alt.createStore
@immutable
class GameStore {
  static displayName = 'GameStore';

  constructor() {
    this.bindActions(FieldActions);
    this.bindActions(GameActions);
    this.state = Map({
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
      username: '',
    });
  }


  onCreateFieldFor(playerField) {
    const {player, grid} = playerField;
    this.setState(this.state
      .set('size', grid.length)
      .setIn([player, 'field'], grid)
      .set('gameRunning', false)
      .set('activeBoard', 'playerTwo')
      .set('winner', '')
      .set('expectedShipCount', 0)
      .set('gameTime', 0));
  }

  onPlaceShipsFor(playerShips) {
    const {player, grid, ships} = playerShips;
    this.setState(this.state
      .update('expectedShipCount', value => value > ships.length ? ships.length : value)
      .setIn([player, 'health'], ships.length * 2)
      .setIn([player, 'ships'], ships)
      .setIn([player, 'field'], grid));
  }

  onUpdateCell(cellInfo) {
    const player = this.state.get('activeBoard');
    const {cell, row, col, shipHit} = cellInfo;
    this.setState(this.state
      .updateIn([player, 'health'], value => shipHit ? value - 1 : value)
      .updateIn([player, 'field'], grid => {
        grid[row][col] = cell;
        return grid;
      }));
  }

  onTurnOver() {
    this.setState(this.state.update('activeBoard', current => current === 'playerOne' ? 'playerTwo' : 'playerOne'));
  }

  onExpectedShipCount(count) {
    this.setState(this.state.set('expectedShipCount', count));
  }

  onGameStart(username) {
    this.setState(this.state
      .set('gameRunning', this.state.get('expectedShipCount') > 0)
      .set('winner', '')
      .set('username', username));
  }

  onGameOver(time) {
    this.setState(this.state
      .set('gameRunning', false)
      .set('winner', this.state.get('activeBoard') === 'playerOne' ? 'playerTwo' : 'playerOne')
      .set('gameTime', time));
  }
}

export default GameStore;
