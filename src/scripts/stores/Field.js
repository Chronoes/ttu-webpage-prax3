const immutable = require('alt/utils/ImmutableUtil');
const {Map} = require('immutable');

const alt = require('../altInstance');
const FieldActions = require('../actions/Field');
const {MAX_SIZE} = require('../components/grid/GridSize');

const FieldStore = alt.createStore(immutable({displayName: 'FieldStore',
  bindListeners: {
    onCreateField: FieldActions.createField,
    onPlaceShips: FieldActions.placeShips,
  },

  state: new Map({
    field: FieldActions.createField(MAX_SIZE),
    shipCount: MAX_SIZE - 1,
    ships: [],
  }),

  onCreateField: function(field) {
    this.setState(this.state.set('field', field));
  },

  onPlaceShips: function(newState) {
    console.log(newState);
    const {ships, updatedGrid} = newState;
    this.setState(this.state.set('ships', ships).set('field', updatedGrid));
  },

}));

module.exports = FieldStore;
