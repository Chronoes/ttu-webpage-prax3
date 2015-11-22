import React, {Component} from 'react';

import GameActions from '../../actions/Game';

class GridSize extends Component {
  static displayName: 'GridSize';
  static MIN_SIZE = 3;
  static MAX_SIZE = 10;

  createField(event) {
    const size = event ? event.target.value : GridSize.MAX_SIZE;
    if (size >= GridSize.MIN_SIZE) {
      GameActions.setupBoard(size);
    }
  }

  sizeOptions() {
    const {MIN_SIZE, MAX_SIZE} = GridSize;
    const arr = [];
    for (let i = MIN_SIZE; i <= MAX_SIZE; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }
    return arr;
  }

  render() {
    return (
      <div className="size-select">
        <select className="value-selection" defaultValue={this.props.boardSize} onChange={this.createField}>
          <option className="disabled" value="0" disabled>Grid Size</option>
          {this.sizeOptions()}
        </select>
      </div>
    );
  }
}

export default GridSize;
