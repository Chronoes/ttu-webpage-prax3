const immutable = require('alt/utils/ImmutableUtil');
const {Map, List} = require('immutable');

const alt = require('../altInstance');
const ScoreActions = require('../actions/Score');

const ScoreStore = alt.createStore(immutable({displayName: 'ScoreStore',
  bindListeners: {
    onAddScore: ScoreActions.addScore,
  },

  state: List([
    Map({
      gridSize: 0,
      shipCount: 0,
      playerOneShots: 0,
      playerTwoShots: 0,
      gameTime: 0,
    }),
  ]),

  onAddScore: function(newScore) {
    this.setState(this.state.unshift(Map(newScore)));
  },
}));

module.exports = ScoreStore;
