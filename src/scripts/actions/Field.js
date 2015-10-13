var React = require('react');

var alt = require('../altInstance');
var Empty = require('../components/Empty');


var FieldActions = alt.createActions({
  createField: function(size) {
    for (var grid = []; grid.length < size;) {
      for (var subgrid = []; subgrid.push(React.createElement(Empty)) < size;);
      grid.push(subgrid);
    }
    this.dispatch(grid);
    console.log(grid);
  },
});

module.exports = FieldActions;
