const typeDefinitions = `

type User {
  id: String,
  username: String,
}

type Photo {
  id: String,
  url: String,
  user: User,
}

type Query {
  getUsers: [User],
  getPhotos: [Photo],
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
