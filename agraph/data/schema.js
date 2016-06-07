const typeDefinitions = `

type User {
  id: String,
  username: String,
}

type Photo {
  id: String,
  url: String,
}

type RootQuery {
  user(id: String): User,
  getUsers: [User],
  getPhotos: [Photo],
}

schema {
  query: RootQuery
}
`;

export default [typeDefinitions];
