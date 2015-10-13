var React = require('react');
var utilReact = require('../../util/React');

var FieldActions = require('../../actions/Field');

var GridSize = React.createClass({displayName: 'GridSize',
  statics: {
    MIN_SIZE: 3,
    MAX_SIZE: 10,
  },

  componentDidMount: function() {
    this.createField();
  },

  createField: function(event) {
    var size = event ? event.target.value : GridSize.MAX_SIZE;
    console.log(size);
    FieldActions.createField(size);
  },

  sizeOptions: function() {
    for (var i = GridSize.MIN_SIZE, arr = []; i <= GridSize.MAX_SIZE; i++) {
      arr.push(React.DOM.option(null, i));
    }
    return arr;
  },

  render: function() {
    return (
      utilReact.spread(
        React.DOM.select,
        {onChange: this.createField},
        this.sizeOptions()
    ));
  },
});

module.exports = GridSize;
