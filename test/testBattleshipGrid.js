var assert = require('assert');
var Immutable = require('immutable');
var module = require('../src/js/BattleshipGrid');

describe('BattleshipGrid', function () {
  var size = 3;
  var grid = new module.BattleshipGrid(size);
  var mockData = Immutable.List([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);
  describe('initialisation', function () {
    it('should set given grid size', function() {
      assert.equal(size, grid.getSize());
    });
  });
  describe('#update()', function () {
    it('should update grid matrix with sent data');
  });
  describe('#view()', function () {
    it('should render a properly sized table in HTML');
  });
});
