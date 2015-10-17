const React = require('react');

const Ship = React.createClass({displayName: 'Ship',
  statics: {
    LENGTH: 2,
    HORIZONTAL: 0,
  },

  render: function() {
    return (
      <div className="ship-frigate"></div>
    );
  },
});

module.exports = Ship;
