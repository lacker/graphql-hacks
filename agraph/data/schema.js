const typeDefinitions = `
type Query {
  hello: String,
  favoriteNumber: Int
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
