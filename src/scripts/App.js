const React = require('react');

const GameBoard = require('./components/GameBoard');
const HighScores = require('./components/HighScores');

function App() {
  return (
    <div>
      <div className="header">
        <h2>Battleship Game</h2>
        <h4>Marten Tarkin (143076IAPB)</h4>
      </div>
      <hr />
      <GameBoard />
      <hr />
      <HighScores />
    </div>
  );
}

App.displayName = 'App';

module.exports = App;
