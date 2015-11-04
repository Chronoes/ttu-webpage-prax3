const React = require('react');
const connectToStores = require('alt/utils/connectToStores');

const FieldActions = require('../actions/Field');
const GameActions = require('../actions/Game');
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
        winner: gameState.get('winner'),
      };
    }
  },

  componentWillReceiveProps: function(nextProps) {
    const {expectedShipCount, playerOne, playerTwo, size} = nextProps;
    if (playerOne.get('ships').length > expectedShipCount) {
      FieldActions.placeShipsFor('playerOne', FieldActions.createField(size), expectedShipCount);
      return false;
    }
    if (playerTwo.get('ships').length > expectedShipCount) {
      FieldActions.placeShipsFor('playerTwo', FieldActions.createField(size), expectedShipCount);
      return false;
    }
    return true;
  },

  render: function() {
    const {playerOne, playerTwo, activeBoard, size, gameRunning, winner, expectedShipCount} = this.props;
    var currentHeader = 'Choose grid size and ship count';
    if (gameRunning) {
      currentHeader = activeBoard === 'playerTwo' ? 'Player\'s turn' : 'Computer\'s turn';
    } else if (winner) {
      currentHeader = winner === 'playerOne' ? 'Player wins!' : 'Computer wins!';
    }
    return (
      <div className="container-fluid">
        <h4 className="header">{currentHeader}</h4>
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
          <StartGame
            clickAction={gameRunning ? GameActions.setupShips.bind(null, size, expectedShipCount) : GameActions.gameStart} />
          <Timer gameRunning={gameRunning} />
        </div>
      </div>
    );
  },
});

module.exports = connectToStores(GameBoard);
