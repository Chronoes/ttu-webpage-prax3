import React from 'react';

import alt from '../altInstance';
import Cell from '../components/grid/Cell';
import Empty from '../components/Empty';
import Ship from '../components/Ship';
import {isValidSquare, randomNumber, updateGridWithShip} from '../util/grid';

@alt.createActions
class FieldActions {
  static displayName = 'FieldActions';

  createFieldFor(player, size) {
    return {player, grid: FieldActions.createField(size)};
  }

  createField(size) {
    const grid = [];
    for (; grid.length < size;) {
      const subgrid = [];
      for (; subgrid.push(<Cell><Empty /></Cell>) < size;);
      grid.push(subgrid);
    }
    return grid;
  }

  placeShipsFor(player, grid, count) {
    const size = grid.length;
    let updatedGrid = grid;
    const ships = [];
    for (let i = 0; i < count; i++) {
      let tries = 0;
      while (tries < 20) {
        const row = randomNumber(size - 1);
        const col = randomNumber(size - 1);
        let validShip = isValidSquare(grid, row, col);
        for (let len = 1; len < Ship.LENGTH && validShip; len++) {
          validShip = isValidSquare(updatedGrid, row, col + len);
        }

        if (validShip) {
          const ship = <Ship id={ships.length} coords={{start: {row, col}, orientation: Ship.HORIZONTAL}} />;
          ships.push(ship);
          updatedGrid = updateGridWithShip(updatedGrid, ship);
          break;
        }
        tries++;
      }
    }
    return {player, grid: updatedGrid, ships};
  }

  updateCell(cell, row, col, shipHit) {
    return {
      cell: React.cloneElement(cell, {cellClicked: true}),
      row, col,
      shipHit: !cell.props.cellClicked && shipHit,
    };
  }
}

export default FieldActions;
