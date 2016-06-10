function choice(alist) {
  return alist[Math.floor(Math.random() * alist.length)]
}

function randomString() {
  let answer = '';
  for (let i = 0; i < 10; i++) {
    answer += choice('0123456789'
                     + 'abcdefghijklmnopqrstuvwxyz'
                     + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
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
