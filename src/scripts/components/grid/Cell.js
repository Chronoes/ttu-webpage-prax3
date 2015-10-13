const React = require('react');

const Cell = React.createClass({displayName: 'Cell',
  propTypes: {
    value: React.PropTypes.element,
    onCellClick: React.PropTypes.func,
  },

  getInitialState: function() {
    return {cellClicked: false};
  },

  handleClick: function() {
    this.props.onCellClick();
    this.setState({cellClicked: true});
  },

  render: function() {
    const {element} = this.props;
    const newElement = React.cloneElement(element, {cellClicked: this.state.cellClicked});
    console.log(newElement);
    return (
      <td onClick={this.handleClick}>{newElement}</td>
    );
  }
});

module.exports = Cell;
