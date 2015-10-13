const React = require('react');

const Cell = require('./Cell');

const Grid = React.createClass({displayName: 'Grid',
  handleCellClick: function(row, col) {
    console.log('Clicked pos: ' + row + ' ' + col);
  },

  renderRow: function(row, rowIdx) {
    return (
      <tr key={rowIdx}>
        {row.map(function(value, colIdx) {
          return (<Cell
            key={rowIdx + ' ' + colIdx}
            element={value}
            onCellClick={this.handleCellClick.bind(this, rowIdx, colIdx)}
            cellShot={false} />);
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
