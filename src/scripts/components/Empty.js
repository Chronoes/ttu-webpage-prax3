var React = require('react');

var Empty = React.createClass({displayName: 'Empty',
  render: function() {
    return (
      React.DOM.div({className: 'ship-empty'}, 0)
    );
  },
});

module.exports = Empty;
