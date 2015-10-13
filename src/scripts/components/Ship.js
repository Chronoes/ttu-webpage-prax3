const React = require('react');

const Ship = React.createClass({displayName: 'Ship',
  statics: {
    LENGTH: 2,
    HORIZONTAL: 0,
  },

  propTypes: {
    coords: React.PropTypes.object,
  },

  render: function() {
    return (
      <div className="ship-frigate">{Ship.LENGTH}</div>
    );
  },
});

module.exports = Ship;
