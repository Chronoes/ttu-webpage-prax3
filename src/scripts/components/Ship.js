import React from 'react';

const Ship = React.createClass({displayName: 'Ship',
  statics: {
    LENGTH: 2,
    HORIZONTAL: 0,
  },

  render: function() {
    const {primary} = this.props;
    return (
      <div className="ship-frigate">
        {primary ? <img src="tarkinship-noshadow.svg" /> : ''}
      </div>
    );
  },
});

module.exports = Ship;
