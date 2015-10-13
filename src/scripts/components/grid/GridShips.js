const React = require('react');

const FieldActions = require('../../actions/Field');
const GridSize = require('./GridSize');

const GridShips = React.createClass({displayName: 'GridShips',
  statics: {
    MAX_SHIP_COUNT: GridSize.MAX_SIZE - 1,
    MIN_SHIP_COUNT: 1,
  },

  placeNewShips: function(event) {
    const count = event ? event.target.value : GridShips.MAX_SHIP_COUNT;
    const field = this.props.fieldState.get('field');
    const newField = FieldActions.createField(field.length);
    FieldActions.placeShips(newField, count);
  },

  shipCountOptions: function(maxShips) {
    const {MIN_SHIP_COUNT} = GridShips;
    for (var i = MIN_SHIP_COUNT, arr = []; i <= maxShips; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }
    return arr;
  },

  render: function() {
    const maxShipCount = this.props.fieldState.get('field').length - 1;
    return (
      <select defaultValue={maxShipCount} onChange={this.placeNewShips}>
        {this.shipCountOptions(maxShipCount)}
      </select>
    );
  },
});

module.exports = GridShips;
