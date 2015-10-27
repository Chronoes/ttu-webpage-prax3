const React = require('react');

const FieldActions = require('../../actions/Field');
const GameActions = require('../../actions/Game');
const {hasShip} = require('../../util/grid');

const Grid = React.createClass({displayName: 'Grid',
  handleCellClick: function(row, col) {
    const {gameRunning, myTurn, fieldState} = this.props;
    if (!gameRunning && !myTurn) {
      console.log('Clicked pos: ' + row + ' ' + col);
      const cell = fieldState.get('field')[row][col];
      const ships = fieldState.get('ships');
      FieldActions.updateCell(cell, row, col);
      if (!hasShip(ships, row, col)) {
        GameActions.turnOver();
      }
    }
  },

  renderRow: function(row, rowIdx) {
    return (
      <tr key={rowIdx}>
        {row.map(function(cell, colIdx) {
          return (React.cloneElement(cell, {
            key: [rowIdx, colIdx],
            onCellClick: this.handleCellClick.bind(this, rowIdx, colIdx),
            isVisible: this.props.shipsAreVisible,
          }));
        }.bind(this))}
      </tr>
    );
  },

  render: function() {
    const field = this.props.fieldState.get('field');
    return (
      <table className="battleship-grid">
        <tbody>
          {field.map(this.renderRow)}
        </tbody>
      </table>
    );
  },
});

module.exports = Grid;
