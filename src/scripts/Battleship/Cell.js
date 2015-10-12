var React = require('react');

var Cell = React.createClass({displayName: 'Cell',
  propTypes: {
    value: React.PropTypes.element,
    onClick: React.PropTypes.func,
  },

  render: function() {
    return (
      React.DOM.td({onClick: this.props.onClick}, this.props.value)
    );
  }
});

module.exports = Cell;
