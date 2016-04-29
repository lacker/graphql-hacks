jest.unmock('../ObjectType');

import ObjectType from '../ObjectType';

describe('object schema', () => {
  it('works with non-null', () => {
    const schema = {
      MyThing: {
        id: 'String!',
      }
    };
    const MyThing = new ObjectType('MyThing', schema.MyThing);
    expect(MyThing.sequelize.id.type).not.toBeUndefined();
  });
});
