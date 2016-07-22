// @flow

const SortedSet = require('js-sorted-set');

let s = new SortedSet();
s.insert(1);

function add(x: number) {
  if (!s.contains(x)) {
    s.insert(x);
  }
}

while (true) {
  let first: number = s.beginIterator().value();
  console.log(first);
  add(first * 2);
  add(first * 3);
  add(first * 5);
  s.remove(first);
}
