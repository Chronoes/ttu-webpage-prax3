const React = require('react');
const GameBoard = require('./components/GameBoard');

const App = React.createClass({displayName: 'App',
  render: function() {
    return (
      <div>
        <div className="header">
          <h2>Battleship Game</h2>
          <h4>Marten Tarkin (143076IAPB)</h4>
        </div>
        <GameBoard />
      </div>
    );
  },
});

module.exports = App;
