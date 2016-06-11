jest.unmock('../ids');

import {
  makeId,
  getTypeName,
} from '../ids';

describe('id encoding', () => {
  it('is reversible', () => {
    const id = makeId('foo');
    expect(getTypeName(id)).toBe('foo');
  });
});
