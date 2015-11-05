const React = require('react');
const {List} = require('immutable');

const FieldActions = require('../../actions/Field');
const GameActions = require('../../actions/Game');
const {hasShip, randomNumber} = require('../../util/grid');

const Grid = React.createClass({displayName: 'Grid',

  getInitialState: function() {
    return {possibleMoves: List(List()), acted: false};
  },

  componentWillReceiveProps: function(nextProps) {
    const {gameRunning, fieldState, time, aiEnabled, myTurn} = nextProps;
    if (gameRunning) {
      if (fieldState.get('health') === 0) {
        GameActions.gameOver(time);
      } else if (aiEnabled && !myTurn && !this.state.acted) {
        this.setState({acted: true});
        setTimeout(this.aiMove, 1000);
      }
    } else {
      const size = fieldState.get('field').length;
      this.setState({possibleMoves: List().setSize(size * size).map(function(val, i) {
        return List.of(Math.floor(i / size), i % size);
      })});
    }
    return true;
  },

  aiMove: function() {
    const {possibleMoves} = this.state;
    const index = randomNumber(possibleMoves.size);
    const move = possibleMoves.get(index);
    this.setState({possibleMoves: possibleMoves.delete(index)});
    this.handleCellClick(move.first(), move.last());
  },

  handleCellClick: function(row, col) {
    const {gameRunning, myTurn, fieldState} = this.props;
    if (gameRunning && !myTurn) {
      const cell = fieldState.get('field')[row][col];
      const ships = fieldState.get('ships');
      const shipHit = hasShip(ships, cell);
      FieldActions.updateCell(cell, row, col, shipHit);
      if (!shipHit) {
        GameActions.turnOver();
      }
      this.setState({acted: false});
    }
  },

  renderRow: function(row, rowIdx) {
    return (
      <tr key={rowIdx}>
        {row.map(function(cell, colIdx) {
          return (React.cloneElement(cell, {
            key: [rowIdx, colIdx],
            onCellClick: !this.props.aiEnabled ? this.handleCellClick.bind(this, rowIdx, colIdx) : function() {},
            isVisible: this.props.shipsAreVisible,
          }));
        }.bind(this))}
      </tr>
    );
  },

  render: function() {
    const {fieldState, myTurn, gameRunning, aiEnabled} = this.props;
    const field = fieldState.get('field');
    return (
      <table className={'battleship-grid' + (!gameRunning || myTurn || aiEnabled ? '' : ' active')}>
        <tbody>
          {field.map(this.renderRow)}
        </tbody>
      </table>
    );
  },
});

module.exports = Grid;
