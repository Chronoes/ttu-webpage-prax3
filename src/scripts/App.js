import React, {Component} from 'react';
import {parse as parseURL} from 'url';

import GameBoard from './components/GameBoard';
import HighScores from './components/HighScores';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {
        '/': (<GameBoard />),
        '/scores': (<HighScores />),
      },
      currentRoute: '/',
    };
  }

  routeTo(event) {
    event.preventDefault();
    const nextRoute = parseURL(event.target.href).pathname;
    this.setState({currentRoute: nextRoute});
  }

  render() {
    const {routes, currentRoute} = this.state;
    return (
      <div>
        <div className="header">
          <h2>Battleship Game</h2>
          <h4>Marten Tarkin (143076IAPB)</h4>
        </div>
        <Navbar routeAction={this.routeTo.bind(this)} current={currentRoute} />
        <hr />
        {routes[currentRoute]}
      </div>
    );
  }
}

App.displayName = 'App';

module.exports = App;
