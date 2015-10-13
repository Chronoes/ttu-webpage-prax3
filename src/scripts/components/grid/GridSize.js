const React = require('react');

const FieldActions = require('../../actions/Field');

const GridSize = React.createClass({displayName: 'GridSize',
  statics: {
    MIN_SIZE: 3,
    MAX_SIZE: 10,
  },

  createField: function(event) {
    const size = event ? event.target.value : GridSize.MAX_SIZE;
    FieldActions.createField(size);
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
      <select defaultValue={GridSize.MAX_SIZE} onChange={this.createField}>
        {this.sizeOptions()}
      </select>
    );
  },
});

module.exports = GridSize;
