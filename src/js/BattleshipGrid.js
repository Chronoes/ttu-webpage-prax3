var Immutable = require('immutable');

function BattleshipGrid(size) {
  this.constants = {
    EMPTY_CELL: 0,
    MISSED_CELL: 1
  };
  this.matrix = Immutable.List().setSize(size).map(function(row) {
    return Immutable.List().setSize(size);
  });
  console.log(this.constants);
};

BattleshipGrid.prototype.getSize = function() {
  return this.matrix.size;
};

BattleshipGrid.prototype.update = function(row, col, value) {
  this.view(this.matrix.setIn([row, col], value));
};

BattleshipGrid.prototype.view = function(state) {
  // code...  
};

exports.BattleshipGrid = BattleshipGrid;
