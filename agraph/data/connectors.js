
class InMemoryConnector {
  constructor() {
    this.data = {
      users: [{
        id: 'q1w2',
        username: 'hector',
      }],
      photos: [{
        id: 'e3r4',
        user: 'q1w2',
        url: 'https://pbs.twimg.com/profile_images/733157786557669376/hqX66otO_400x400.jpg'
      }],
    };
  }
}

const connectors = {
  memory: new InMemoryConnector(),
};

export default connectors;
