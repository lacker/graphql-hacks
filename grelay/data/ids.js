import bigInt from 'big-integer';

const CHARMAP = ('0123456789' +
                 'abcdefghijklmnopqrstuvwxyz' +
                 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

// Converts an int/bigInt into a string using base62 encoding.
function base62(integer) {
  integer = bigInt(integer);
  let chars = [];
  while (integer.greater(0)) {
    const { quotient, remainder } = integer.divmod(62);
    chars.unshift(CHARMAP[remainder.toJSNumber()]);
    integer = quotient;
  }
  return chars.join('');
}

// The reverse of base62 - converts a string into a bigInt.
// TODO: test
function unbase62(string) {
  let integer = bigInt(0);
  for (let char of string) {
    const index = CHARMAP.index(char);
    if (index < 0) {
      throw 'bad char: ' + char;
    }
    integer = integer.times(62).plus(index);
  }
  return integer;
}

// Converts a string to a big integer, treating it as bytes
function s2int(string) {
  let integer = bigInt(0);
  for (let char of string) {
    const code = char.charCodeAt(0);
    integer = integer.times(256).plus(code);
  }
  return integer;
}

// Converts a big integer back to a string, reverse of s2int
function int2s(integer) {
  let integer = bigInt(integer);
  let chars = [];
  while (integer > 0) {
    const {quotient, remainder} = integer.divmod(256);
    integer = quotient
    chars.push(String.fromCharCode(remainder));
  }
  return chars.join('');
}

function choice(alist) {
  return alist[Math.floor(Math.random() * alist.length)]
}

function randomString() {
  let answer = '';
  for (let i = 0; i < 10; i++) {
    answer += choice(CHARMAP);
  }
  return answer;
}

function makeId(typeName) {
  return typeName + ':' + randomString();
}

function getTypeName(id) {
  return id.match(/(.*):/)[1];
}

module.exports = {
  makeId,
  getTypeName,
};
