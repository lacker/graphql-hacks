const SortedSet = require('js-sorted-set');

let s = new SortedSet();
s.insert(1);

function add(x) {
  if (!s.contains(x)) {
    s.insert(x);
  }
}

while (true) {
  let first = s.beginIterator().value();
  console.log(first);
  add(first * 2);
  add(first * 3);
  add(first * 5);
  s.remove(first);
}
