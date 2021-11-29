const assert = require('assert');

function testFunction() {
  return 100;
}

console.log('testFunction');
assert(testFunction() > 1000);
