const React = require('react');

const GameActions = require('../actions/Game');

const StartGame = React.createClass({
  startGame: function() {
    GameActions.gameStateChange(true);
  },

  render: function() {
    return (
      <div className="start-game">
        <button className="btn-start-game" onClick={this.startGame}>
          Start Game
        </button>
      </div>
    );
  },
});

module.exports = StartGame;
