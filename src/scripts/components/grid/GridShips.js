import React, {Component} from 'react';

import GameActions from '../../actions/Game';
import GridSize from './GridSize';

class GridShips extends Component {
  static displayName: 'GridShips';
  static MAX_SHIP_COUNT = GridSize.MAX_SIZE - 1;
  static MIN_SHIP_COUNT = 1;

  placeNewShips(event) {
    const count = event ? event.target.value : GridShips.MAX_SHIP_COUNT;
    GameActions.setupShips(this.props.boardSize, count);
  }

  shipCountOptions(maxShips) {
    const {MIN_SHIP_COUNT} = GridShips;
    const arr = [];
    for (let i = MIN_SHIP_COUNT; i <= maxShips; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }
    return arr;
  }

  render() {
    const maxShipCount = this.props.boardSize - 1;
    return (
      <div className="ship-select">
        <select className="value-selection" defaultValue="0" onChange={this.placeNewShips.bind(this)}>
          <option className="disabled" value="0" disabled>Ships</option>
          {this.shipCountOptions(maxShipCount)}
        </select>
      </div>
    );
  }
}

export default GridShips;
