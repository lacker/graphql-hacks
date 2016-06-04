const mocks = {
  String: () => 'world!',
  Int: () => 42,
  User: () => ({
    id: 'mockID',
    username: 'mockUsername',
  }),
  Photo: () => ({
    id: 'mockID',
    url: 'http://example.com/mock.jpg',
  }),
};

export default mocks;
