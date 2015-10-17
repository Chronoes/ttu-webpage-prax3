const React = require('react');

const GameActions = require('../../actions/Game');

const GridSize = React.createClass({displayName: 'GridSize',
  statics: {
    MIN_SIZE: 3,
    MAX_SIZE: 10,
  },

  createField: function(event) {
    const size = event ? event.target.value : GridSize.MAX_SIZE;
    GameActions.setupBoard(size);
  },

  sizeOptions: function() {
    const {MIN_SIZE, MAX_SIZE} = GridSize;
    for (var i = MIN_SIZE, arr = []; i <= MAX_SIZE; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }
    return arr;
  },

  render: function() {
    return (
      <label>Grid Size
        <select defaultValue={GridSize.MAX_SIZE} onChange={this.createField}>
          {this.sizeOptions()}
        </select>
      </label>
    );
  },
});

module.exports = GridSize;
