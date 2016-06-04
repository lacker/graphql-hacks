const typeDefinitions = `

type User {
  id: String,
  username: String,
}

type Photo {
  id: String,
  url: String,
}

type Query {
  hello: String,
  favoriteNumber: Int,
  getUsers: [User],
  getPhotos: [Photo],
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
