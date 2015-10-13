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
          return <Cell key={rowIdx + ' ' + colIdx} value={value} onCellClick={this.handleCellClick.bind(this, rowIdx, colIdx)} />;
        }.bind(this))}
      </tr>
    );
  },

  render: function() {
    const field = this.props.fieldState.get('field');
    return (
      <table className="table table-bordered">
        <tbody>
          {field.map(this.renderRow)}
        </tbody>
      </table>
    );
  },
});

module.exports = Grid;
