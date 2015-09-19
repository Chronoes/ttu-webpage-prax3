var assert = require('assert');
var module = require('../src/js/main');

describe('Hello World', function() {
  it('should print "Hello World"', function() {
    assert.equal('Hello World', module.main())});
});
