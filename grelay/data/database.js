const bob = {
  id: 'bobId',
  username: 'bob',
};

const theComment = {
  id: 'theCommentId',
  content: 'what would you say you do here',
};

module.exports = {
  getUser: () => bob,
  getComment: () => theComment,
};
