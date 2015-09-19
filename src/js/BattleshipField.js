function BattleshipField(gridSize) {
  this.gridSize = gridSize;
};

BattleshipField.prototype.setGridSize = function(size) {
  this.gridSize = size;
};

BattleshipField.prototype.getGridSize = function() {
  return this.gridSize;
};

exports.BattleshipField = BattleshipField;
