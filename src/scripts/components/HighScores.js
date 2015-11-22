import React, {Component} from 'react';
import connectToStores from 'alt/utils/connectToStores';

import {getScores} from '../actions/Score';
import ScoreStore from '../stores/Score';

@connectToStores
class HighScores extends Component {
  static displayName = 'HighScores';

  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      headerStatus: {
        name: '',
        order: '',
      },
    };
    this.headers = ['dateTime', 'username', 'gridSize', 'shipCount', 'playerOneScore', 'playerTwoScore', 'gameTime'];
    this.mappedHeaders = {
      dateTime: 'Date',
      username: 'Username',
      gridSize: 'Board size',
      shipCount: 'Ship count',
      playerOneScore: 'Player score',
      playerTwoScore: 'Computer score',
      gameTime: 'Time spent',
    };
  }

  static getStores() {
    return [ScoreStore];
  }

  static getPropsFromStores() {
    return {scoreState: ScoreStore.getState()};
  }

  searchUsername() {
    const username = this.refs.username.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => getScores(username ? {username} : null), 200);
  }

  filterColumn(headerKey) {
    const params = {sortBy: headerKey};
    const username = this.refs.username.value;
    if (username) {
      params.username = username;
    }
    const {headerStatus} = this.state;
    headerStatus.name = headerKey;
    if (headerStatus.order === 'descending') {
      headerStatus.order = 'ascending';
      params.order = 'asc';
    } else {
      headerStatus.order = 'descending';
      params.order = 'desc';
    }
    this.setState({headerStatus});
    getScores(params);
  }

  render() {
    const {headerStatus} = this.state;
    return (
      <div className="container-fluid">
        <input ref="username" className="highscore-username" placeholder="Search by username..." onChange={this.searchUsername.bind(this)} />
        <table className="highscore">
          <thead className="highscore-header">
            <tr>
              {this.headers.map(key =>
                <th key={key} onClick={this.filterColumn.bind(this, key)}>
                  {this.mappedHeaders[key] + (headerStatus.name === key ? ` (${headerStatus.order})` : '')}
                </th>
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
