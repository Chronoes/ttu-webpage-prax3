var assert = require('assert');
var module = require('../src/js/BattleshipField');

describe('BattleshipField', function () {
  describe('initialisation', function () {
    var field = new module.BattleshipField(5);
    it('should set given grid size', function() {
      assert.equal(5, field.getGridSize());
    });
  });
});
