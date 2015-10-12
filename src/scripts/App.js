var React = require('react');
var GridContainer = require('./Battleship/GridContainer');

var App = React.createClass({displayName: 'App',
  render: function() {
    var BSgrid = React.createElement(GridContainer);
    return (
      React.DOM.div(null, 'Test React',
        React.DOM.div(null, BSgrid)
      )
    );
  },
});

module.exports = App;
