var React = require('react');
var connectToStores = require('alt/utils/connectToStores');

var FieldStore = require('../stores/Field');
var Grid = require('./grid/Grid');
var GridSize = require('./grid/GridSize');

var GridContainer = React.createClass({displayName: 'GridContainer',
  statics: {
    getStores: function() {
      return [FieldStore];
    },

    getPropsFromStores: function() {
      return {fieldState: FieldStore.getState()};
    }
  },

  render: function() {
    return (
      React.DOM.div(null,
        React.createElement(GridSize),
        React.createElement(Grid, {fieldState: this.props.fieldState})
      )
    );
  },
});

module.exports = connectToStores(GridContainer);
