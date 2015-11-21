import alt from '../altInstance';

import FieldActions from './Field';

@alt.createActions
class GameActions {
  static displayName: 'GameActions';

  gameStart() {
    return true;
  }

  gameOver(time) {
    return time;
  }

  turnOver() {
    return true;
  }

  expectedShipCount(count) {
    return count;
  }

  setGameTime(time) {
    return time;
  }

  setupBoard(size) {
    return {
      playerOne: FieldActions.createFieldFor('playerOne', size),
      playerTwo: FieldActions.createFieldFor('playerTwo', size),
    };
  }

  setupShips(boardSize, count) {
    const {playerOne, playerTwo} = this.actions.setupBoard(boardSize);
    this.actions.expectedShipCount(count);
    return {
      playerOne: FieldActions.placeShipsFor(playerOne.player, playerOne.grid, count),
      playerTwo: FieldActions.placeShipsFor(playerTwo.player, playerTwo.grid, count),
    };
  }
}

export default GameActions;
