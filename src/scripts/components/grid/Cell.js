import React from 'react';

import Empty from '../Empty';

const Cell = React.createClass({displayName: 'Cell',
  propTypes: {
    onCellClick: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {cellClicked: false};
  },

  render: function() {
    const {children, cellClicked, primary, isVisible, onCellClick} = this.props;
    const hit = cellClicked ? 'hit' : '';
    const miss = cellClicked ? 'miss' : '';
    return (
      <td
        className={children.type === Empty ? miss : hit}
        onClick={!cellClicked ? onCellClick : ''}>
        {isVisible ? React.cloneElement(children, {primary}) : <Empty />}
      </td>
    );
  }
});

module.exports = Cell;
