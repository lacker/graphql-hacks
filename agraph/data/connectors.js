
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

  getByID(dataName, id) {
    const datalist = this.data[dataName];
    for (let obj of datalist) {
      if (obj.id == id) {
        return obj;
      }
    }
  }
}

const connectors = {
  memory: new InMemoryConnector(),
};

export default connectors;
