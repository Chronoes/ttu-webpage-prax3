import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import FieldActions from '../actions/Field';
import GameActions from '../actions/Game';
import ScoreActions from '../actions/Score';
import GameStore from '../stores/Game';
import {countShots} from '../util/grid';
import Grid from './grid/Grid';
import GridSize from './grid/GridSize';
import GridShips from './grid/GridShips';
import StartGame from './StartGame';
import Timer from './Timer';

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
        gameTime: gameState.get('gameTime'),
      };
    }
  },

  getInitialState: function() {
    return {time: 0};
  },

  tick: function() {
    this.setState({time: this.state.time + 1});
  },

  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.gameRunning) {
      this.setState({time: 0});
    }
  },

  shouldComponentUpdate: function(nextProps) {
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

  componentWillUpdate: function(nextProps) {
    const {winner, gameRunning} = nextProps;
    if (!gameRunning && winner) {
      const {size, expectedShipCount, playerOne, playerTwo, gameTime} = nextProps;
      ScoreActions.addScore({
        gridSize: size,
        shipCount: expectedShipCount,
        playerOneShots: countShots(playerTwo.get('field')),
        playerTwoShots: countShots(playerOne.get('field')),
        gameTime,
      });
    }
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
            time={this.state.time}
            shipsAreVisible
            aiEnabled />
        </div>
        <div className="player-two">
          <Grid
            fieldState={playerTwo}
            myTurn={activeBoard !== 'playerTwo'}
            gameRunning={gameRunning}
            time={this.state.time} />
        </div>
        <div className="grid-options">
          <GridSize boardSize={size} />
          <GridShips boardSize={size} />
          <StartGame
            clickAction={gameRunning || winner ? GameActions.setupShips.bind(null, size, expectedShipCount) : GameActions.gameStart} />
          {gameRunning ? (<Timer tick={this.tick} time={this.state.time} />) : ''}
        </div>
      </div>
    );
  },
});

module.exports = connectToStores(GameBoard);
