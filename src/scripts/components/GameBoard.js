const React = require('react');
const connectToStores = require('alt/utils/connectToStores');

const GameStore = require('../stores/Game');
const Grid = require('./grid/Grid');
const GridSize = require('./grid/GridSize');
const GridShips = require('./grid/GridShips');

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
        shipCount: gameState.get('shipCount'),
      };
    }
  },

  render: function() {
    const {playerOne, playerTwo, activeBoard, size} = this.props;
    return (
      <div className="container-fluid">
        <div className="player-one">
          <Grid fieldState={playerOne} myTurn={activeBoard !== 'playerOne'} />
        </div>
        <div className="player-two">
          <Grid fieldState={playerTwo} myTurn={activeBoard !== 'playerTwo'} />
        </div>
        <div className="grid-options">
          <GridSize />
          <GridShips boardSize={size} />
        </div>
      </div>
    );
  },
});

module.exports = connectToStores(GameBoard);
