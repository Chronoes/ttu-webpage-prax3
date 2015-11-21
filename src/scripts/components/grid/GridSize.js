import React from 'react';

import GameActions from '../../actions/Game';

const GridSize = React.createClass({displayName: 'GridSize',
  statics: {
    MIN_SIZE: 3,
    MAX_SIZE: 10,
  },

  createField: function(event) {
    const size = event ? event.target.value : GridSize.MAX_SIZE;
    if (size >= GridSize.MIN_SIZE) {
      GameActions.setupBoard(size);
    }
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
      <div className="size-select">
        <select className="value-selection" defaultValue="0" onChange={this.createField}>
          <option className="disabled" value="0" disabled>Grid Size</option>
          {this.sizeOptions()}
        </select>
      </div>
    );
  },
});

module.exports = GridSize;
