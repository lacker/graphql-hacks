import { graphql } from 'graphql';
import schema from '../schema';

describe('the calculator schema', () => {
  it('gets a five', () => {
    let query = `{
      get(value: 5) {
        value
      }
    }`;
    return graphql(schema, query).then((response) => {
      expect(response.data.get.value).toBe(5);
    });
  });

  it('adds two plus two', () => {
    let query = `{
      get(value: 2) {
        plus(value: 2) {
          value
        }
      }
    }`;
    return graphql(schema, query).then((response) => {
      expect(response.data.get.plus.value).toBe(4);
    });
  });
});
