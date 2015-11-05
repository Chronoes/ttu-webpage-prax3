const alt = require('../altInstance');

const ScoreActions = alt.createActions({displayName: 'ScoreActions',
  addScore: function(newScore) {
    return newScore;
  },
});

module.exports = ScoreActions;
