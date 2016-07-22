const OrderedSet = require('immutable').OrderedSet;

let s = new OrderedSet([2, 3, 5]);

while (true) {
  let first = s.first();
  console.log(first);
  s = s.delete(first).add(first * 2).add(first * 3).add(first * 5);
}
