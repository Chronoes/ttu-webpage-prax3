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
    const {scoreState} = this.props;
    return (
      <div className="container-fluid">
        <table className="highscore">
          <thead className="highscore-header">
            <tr>
            {['Number', 'Board size', 'Ship count', 'Player shots', 'Computer shots', 'Time spent'].map(function(text, i) {
              return (<th key={i}>{text}</th>);
            })}
            </tr>
          </thead>
          <tbody>
          {scoreState.butLast().take(10).map(function(score, i) {
            return (
            <tr key={i}>
              <td>{i + 1}</td>
              {score.map(function(value, key) {
                return (<td key={key}>{value}</td>);
              }).toArray()}
            </tr>);
          }).toArray()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HighScores;
