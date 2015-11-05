const React = require('react');

const Timer = React.createClass({displayName: 'Timer',

  componentDidMount: function() {
    this.timer = setInterval(this.props.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  render: function() {
    return (
      <div className="label label-default">
        Time: {this.props.time}
      </div>
    );
  },
});

module.exports = Timer;
