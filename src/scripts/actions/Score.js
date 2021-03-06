import {get} from 'axios';
import alt from '../altInstance';

@alt.createActions
class ScoreActions {
  static displayName = 'ScoreActions';

  getScores(filters) {
    const filterParams = filters ? filters : {};
    get('../cgi-bin/prax3/scores.py', {
      params: {
        action: 'get',
        ...filterParams,
      }
    })
    .then(response => this.dispatch(response.data))
    .catch(response => this.actions.getScoresError(response));
  }

  getScoresError(resp) {
    return resp;
  }

  addScore(newScore) {
    get('../cgi-bin/prax3/scores.py', {
      params: {
        action: 'add',
        ...newScore,
      },
    })
    .then(response => this.dispatch(response.data))
    .catch(response => this.actions.addScoreError(response));
  }

  addScoreError(resp) {
    return resp;
  }
}

export default ScoreActions;
