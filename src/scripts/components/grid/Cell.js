const React = require('react');

const Empty = require('../Empty');

const Cell = React.createClass({displayName: 'Cell',
  propTypes: {
    onCellClick: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {cellClicked: false};
  },

  handleClick: function() {
    this.props.onCellClick();
  },

  render: function() {
    const {children, cellClicked} = this.props;
    const hit = cellClicked ? 'hit' : '';
    const miss = cellClicked ? 'miss' : '';
    return (
      <td
        className={children.type.displayName === Empty.displayName ? miss : hit}
        onClick={this.handleClick} >
        {children}
      </td>
    );
  }
});

module.exports = Cell;
