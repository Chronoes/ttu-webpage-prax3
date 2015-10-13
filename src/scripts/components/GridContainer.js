const React = require('react');
const connectToStores = require('alt/utils/connectToStores');

const FieldStore = require('../stores/Field');
const Grid = require('./grid/Grid');
const GridSize = require('./grid/GridSize');
const GridShips = require('./grid/GridShips');

const GridContainer = React.createClass({displayName: 'GridContainer',
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
      <div>
        <GridSize />
        <GridShips fieldState={this.props.fieldState} />
        <Grid fieldState={this.props.fieldState} />
      </div>
    );
  },
});

module.exports = connectToStores(GridContainer);
