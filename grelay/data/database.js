

const users = {
  aliceId: {
    username: 'alice',
  },
  bobId: {
    username: 'bob',
  },
};

const comments = {
  aliceCommentId: {
    content: 'curiouser and curiouser',
  },
  bobCommentId: {
    content: 'what would you say you do here',
  },
};

function getUser(id) {
  return {
    ...users[id],
    id
  };
};

function getComment(id) {
  return {
    ...comments[id],
    id
  };
};

function allUsers() {
  return Object.keys(users).map(key => getUser(key));
}

module.exports = {
  getUser,
  getComment,
  allUsers,
};
