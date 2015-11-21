import immutable from 'alt/utils/ImmutableUtil';
import {Map, List} from 'immutable';

import alt from '../altInstance';
import ScoreActions from '../actions/Score';

@alt.createStore
@immutable
class ScoreStore {
  static displayName = 'ScoreStore';

  constructor() {
    this.bindActions(ScoreActions);
    this.state = List([
      Map({
        dateTime: '00.00.0000 00:00:00',
        username: '',
        gridSize: 0,
        shipCount: 0,
        playerOneScore: 0,
        playerTwoScore: 0,
        gameTime: 0,
      }),
    ]);
  }

  orderScore(score) {
    return Map({
      dateTime: score.dateTime,
      username: score.username,
      gridSize: score.gridSize,
      shipCount: score.shipCount,
      playerOneScore: score.playerOneScore,
      playerTwoScore: score.playerTwoScore,
      gameTime: score.gameTime,
    });
  }

  onAddScore(newScore) {
    if (newScore) {
      this.setState(this.state.unshift(this.orderScore(newScore)));
    }
  }

  onAddScoreError(resp) {
    console.log(resp);
  }

  onGetScores(scores) {
    this.setState(List(scores.map(this.orderScore)));
  }

  onGetScoresError(resp) {
    console.log(resp);
  }
}


export default ScoreStore;
