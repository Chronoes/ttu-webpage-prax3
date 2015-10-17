const React = require('react');

const GameActions = require('../../actions/Game');
const GridSize = require('./GridSize');

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
      <label>Grid Ships
        <select defaultValue={maxShipCount} onChange={this.placeNewShips}>
          {this.shipCountOptions(maxShipCount)}
        </select>
      </label>
    );
  },
});

module.exports = GridShips;
