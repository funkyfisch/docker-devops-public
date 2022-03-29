const assert = require('assert');

function testFunction() {
  // FAIL: return 100;
  return 10000;
}

console.log('testFunction');
assert(testFunction() > 1000);
