import React from 'react';

import GameActions from '../../actions/Game';
import GridSize from './GridSize';

const GridShips = React.createClass({displayName: 'GridShips',
  statics: {
    MAX_SHIP_COUNT: GridSize.MAX_SIZE - 1,
    MIN_SHIP_COUNT: 1,
  },

  placeNewShips: function(event) {
    const count = event ? event.target.value : GridShips.MAX_SHIP_COUNT;
    GameActions.setupShips(this.props.boardSize, count);
  },

  shipCountOptions: function(maxShips) {
    const {MIN_SHIP_COUNT} = GridShips;
    for (var i = MIN_SHIP_COUNT, arr = []; i <= maxShips; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }
    return arr;
  },

  render: function() {
    const maxShipCount = this.props.boardSize - 1;
    return (
      <div className="ship-select">
        <select className="value-selection" defaultValue="0" onChange={this.placeNewShips}>
          <option className="disabled" value="0" disabled>Ships</option>
          {this.shipCountOptions(maxShipCount)}
        </select>
      </div>
    );
  },
});

module.exports = GridShips;
