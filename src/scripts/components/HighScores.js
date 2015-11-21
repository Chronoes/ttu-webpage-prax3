import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';

import ScoreStore from '../stores/Score';

@connectToStores
class HighScores extends Component {
  static displayName = 'HighScores';

  static getStores() {
    return [ScoreStore];
  }

  static getPropsFromStores() {
    return {scoreState: ScoreStore.getState()};
  }

  render() {
    return (
      <div className="container-fluid">
        <table className="highscore">
          <thead className="highscore-header">
            <tr>
            {['Date', 'Username', 'Board size', 'Ship count', 'Player score', 'Computer score', 'Time spent'].map((text, i) =>
              <th key={i}>{text}</th>
            )}
            </tr>
          </thead>
          <tbody>
          {this.props.scoreState.map((score, i) => (
            <tr key={i}>
              {score.map((value, key) => <td key={key}>{value}</td>).toArray()}
            </tr>
          )).toArray()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HighScores;
