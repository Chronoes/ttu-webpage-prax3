var React = require('react');
var utilReact = require('../util/React');

var Grid = require('./Grid');
var Empty = require('./Empty');
var Ship = require('./Ship');

var GridContainer = React.createClass({displayName: 'GridContainer',
  MIN_SIZE: 3,
  MAX_SIZE: 10,

  getInitialState: function() {
    return {
      field: [[]],
    };
  },

  componentWillMount: function() {
    this.createField();
  },

  createField: function(event) {
    var size = event ? event.target.value : this.MIN_SIZE;
    for (var grid = []; grid.length < size;) {
      for (var subgrid = []; subgrid.push(React.createElement(Empty)) < size;);
      grid.push(subgrid);
    }
    this.setState({field: grid});
  },

  placeShips: function() {
    this.setState({field: this.state.field.map(function(row, y) {
      var ship = React.createElement(Ship);
      return row.map(function(value, x) {
        return value;
      });
    })
    });
  },

  placeSingleShip: function(ship, row, col) {
    var field = this.state.field;
    for (var i = 0; i < ship.LENGTH; i++) {
      field[]
    }
    this.state.field
  },

  sizeOptions: function() {
    for (var i = this.MIN_SIZE, arr = []; i <= this.MAX_SIZE; i++) {
      arr.push(React.DOM.option(null, i));
    }
    return arr;
  },

  selectSize: function() {
    return utilReact.spread(
      React.DOM.select,
      {onChange: this.createField},
      this.sizeOptions()
    );
  },

  render: function() {
    return (
      React.DOM.div(null,
        this.selectSize(),
        React.createElement(Grid, this.state)
      )
    );
  },
});

module.exports = GridContainer;
