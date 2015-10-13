var immutable = require('alt/utils/ImmutableUtil');
var Map = require('immutable').Map;

var alt = require('../altInstance');
var FieldActions = require('../actions/Field');

var FieldStore = alt.createStore(immutable({displayName: 'FieldStore',
  bindListeners: {
    onCreateField: FieldActions.createField,
  },

  state: new Map({
    field: [[]],
  }),

  onCreateField: function(field) {
    this.setState(this.state.set('field', field));
    console.log(field);
  },

}));

module.exports = FieldStore;
