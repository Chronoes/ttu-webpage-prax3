const React = require('react');

const Cell = React.createClass({displayName: 'Cell',
  propTypes: {
    value: React.PropTypes.element,
    onClick: React.PropTypes.func,
  },

  render: function() {
    const {onCellClick, value} = this.props;
    return (
      <td onClick={onCellClick}>{value}</td>
    );
  }
});

module.exports = Cell;
