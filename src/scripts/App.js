const React = require('react');
const GridContainer = require('./components/GridContainer');

const App = React.createClass({displayName: 'App',
  render: function() {
    return (
      <div>
        <h2>Battleship Game</h2>
        <h4>Marten Tarkin (143076IAPB)</h4>
        <GridContainer />
      </div>
    );
  },
});

module.exports = App;
