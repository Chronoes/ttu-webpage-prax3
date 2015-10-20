const React = require('react');

const FieldActions = require('../../actions/Field');
const GameActions = require('../../actions/Game');
const {isEmptyCell} = require('../../util/grid');

const Grid = React.createClass({displayName: 'Grid',
  handleCellClick: function(row, col) {
    if (!this.props.myTurn) {
      console.log('Clicked pos: ' + row + ' ' + col);
      const cell = this.props.fieldState.get('field')[row][col];
      FieldActions.updateCell(cell, row, col);
      if (isEmptyCell(cell)) {
        GameActions.turnOver();
      }
    }
  },

  renderRow: function(row, rowIdx) {
    return (
      <tr key={rowIdx}>
        {row.map(function(cell, colIdx) {
          return (React.cloneElement(cell, {
            key: rowIdx + ' ' + colIdx,
            onCellClick: this.handleCellClick.bind(this, rowIdx, colIdx),
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
