import { graphql } from 'graphql';
import schema from '../schema';

describe('the calculator schema', () => {
  it('adds two plus two', () => {
    let query = `{
      get(value: 2) {
        plus(value: 2) {
          value
        }
      }
    }`;
    return graphql(schema, query).then((response) => {
      console.log('response:', response);
    });
  });
});
