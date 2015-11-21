import {get} from 'axios';
import alt from '../altInstance';

@alt.createActions
class ScoreActions {
  static displayName = 'ScoreActions';

  addScore(newScore) {
    get('../cgi-bin/prax3/scores.py', {
      params: {
        action: 'add',
        ...newScore,
      }
    })
    .then(response => {
      console.log(response);
      this.dispatch(newScore);
    })
    .catch(response => this.actions.addScoreError(response));
  }

  addScoreError(resp) {
    return resp;
  }
}

export default ScoreActions;
