var expect = require('chai').expect;
var Immutable = require('immutable');
var module = require('../src/js/BattleshipGrid');

describe('BattleshipGrid', function() {
  console.log(Immutable.IndexedSeq);
  var size = 3;
  var mockGrid = Immutable.Repeat(Immutable.Repeat(-1, size), size);
  describe('#newGrid()', function () {
    it('should return a valid grid with given size', function() {
      expect(mockGrid.equals(module.newGrid(size))).to.be.true;
    });
  });
  describe('#updateView()', function () {
    it('should update grid matrix with sent data');
  });
});
