import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';

import FieldActions from '../actions/Field';
import GameActions from '../actions/Game';
import ScoreActions from '../actions/Score';
import GameStore from '../stores/Game';
import Grid from './grid/Grid';
import GridSize from './grid/GridSize';
import GridShips from './grid/GridShips';
import StartGame from './StartGame';
import Timer from './Timer';

@connectToStores
class GameBoard extends Component {
  static displayName: 'GameBoard';

  constructor(props) {
    super(props);
    this.state = {time: 0};
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.gameRunning) {
      this.setState({time: 0});
    }
  }

  shouldComponentUpdate(nextProps) {
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
  }

  componentWillUpdate(nextProps) {
    const {winner, gameRunning} = nextProps;
    if (!gameRunning && winner) {
      const {size, expectedShipCount, playerOne, playerTwo, gameTime, username} = nextProps;
      ScoreActions.addScore({
        gridSize: size,
        shipCount: expectedShipCount,
        playerOneScore: Math.trunc(playerTwo.get('ships').length - playerTwo.get('health') / 2),
        playerTwoScore: Math.trunc(playerOne.get('ships').length - playerOne.get('health') / 2),
        gameTime,
        username,
      });
    }
  }

  static getStores() {
    return [GameStore];
  }

  static getPropsFromStores() {
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
      username: gameState.get('username'),
    };
  }

  tick() {
    this.setState({time: this.state.time + 1});
  }

  startGame() {
    const username = this.refs.username.value;
    GameActions.gameStart(username);
  }

  render() {
    const {playerOne, playerTwo, activeBoard, size, gameRunning, winner, expectedShipCount, username} = this.props;
    const processedUsername = username.length > 20 ? username.substring(0, 20) + '...' : username;
    let currentHeader = 'Choose grid size and ship count';
    if (gameRunning) {
      currentHeader = activeBoard === 'playerTwo' ? `Player ${processedUsername} turn` : 'Computer\'s turn';
    } else if (winner) {
      currentHeader = winner === 'playerOne' ? `Player ${processedUsername} wins!` : 'Computer wins!';
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
          <input ref="username"></input>
          <GridSize boardSize={size} />
          <GridShips boardSize={size} />
          <StartGame
            clickAction={gameRunning || winner ? GameActions.setupShips.bind(null, size, expectedShipCount) : this.startGame.bind(this)} />
          {gameRunning ? (<Timer tick={this.tick.bind(this)} time={this.state.time} />) : ''}
        </div>
      </div>
    );
  }
}

export default GameBoard;
