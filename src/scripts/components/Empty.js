const React = require('react');

const Empty = React.createClass({displayName: 'Empty',
  render: function() {
    return (
      <div className="ship-empty">0</div>
    );
  },
});

module.exports = Empty;
