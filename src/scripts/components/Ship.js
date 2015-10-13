var React = require('react');

var Ship = React.createClass({displayName: 'Ship',
  statics: {
    LENGTH: 2,
  },

  propTypes: {
    coords: React.PropTypes.object,
  },

  getInitialState: function() {
    return {coords: {startRow: 0, startCol: 0, endRow: 0, endCol: Ship.LENGTH}};
  },

  componentWillMount: function() {
    this.setState({coords: this.props.coords});
  },

  render: function() {
    return (
      React.DOM.div({className: 'ship-frigate'}, 2)
    );
  },
});

module.exports = Ship;
