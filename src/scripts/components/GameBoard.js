const React = require('react');
const connectToStores = require('alt/utils/connectToStores');

const FieldActions = require('../actions/Field.js');
const GameStore = require('../stores/Game');
const Grid = require('./grid/Grid');
const GridSize = require('./grid/GridSize');
const GridShips = require('./grid/GridShips');
const StartGame = require('./StartGame');

const GameBoard = React.createClass({displayName: 'GameBoard',
  statics: {
    getStores: function() {
      return [GameStore];
    },

    getPropsFromStores: function() {
      const gameState = GameStore.getState();
      return {
        playerOne: gameState.get('playerOne'),
        playerTwo: gameState.get('playerTwo'),
        activeBoard: gameState.get('activeBoard'),
        size: gameState.get('size'),
        expectedShipCount: gameState.get('expectedShipCount'),
        gameRunning: gameState.get('gameRunning'),
      };
    }
  },

  componentWillReceiveProps: function(nextProps) {
    const {expectedShipCount, playerOne, playerTwo, size} = nextProps;
    if (playerOne.get('shipCount') > expectedShipCount) {
      FieldActions.placeShipsFor('playerOne', FieldActions.createField(size), expectedShipCount);
      return false;
    }
    if (playerTwo.get('shipCount') > expectedShipCount) {
      FieldActions.placeShipsFor('playerTwo', FieldActions.createField(size), expectedShipCount);
      return false;
    }
    return true;
  },

  render: function() {
    const {playerOne, playerTwo, activeBoard, size, gameRunning} = this.props;
    return (
      <div className="container-fluid">
        <div className="player-one">
          <Grid
            fieldState={playerOne}
            myTurn={activeBoard !== 'playerOne'}
            gameRunning={gameRunning}
            shipsAreVisible />
        </div>
        <div className="player-two">
          <Grid
            fieldState={playerTwo}
            myTurn={activeBoard !== 'playerTwo'}
            gameRunning={gameRunning} />
        </div>
        <div className="grid-options">
          <GridSize boardSize={size} />
          <GridShips boardSize={size} />
          <StartGame />
        </div>
      </div>
    );
  },
});

module.exports = connectToStores(GameBoard);
