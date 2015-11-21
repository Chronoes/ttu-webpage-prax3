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
        gridSize: 0,
        shipCount: 0,
        playerOneShots: 0,
        playerTwoShots: 0,
        gameTime: 0,
      }),
    ]);
  }

  onAddScore(newScore) {
    if (newScore) {
      this.setState(this.state.unshift(Map(newScore)));
    }
  }

  onAddScoreError(resp) {
    console.log(resp);
  }
}


export default ScoreStore;
