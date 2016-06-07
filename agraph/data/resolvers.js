const resolvers = {
  RootQuery: {
    user(root, { id }, context) {
      console.log('getting user for id:', id);
      return context.connectors.memory.getByID('User', id);
    },

    getUsers(root, args, context) {
      console.log(context);
      return context.connectors.memory.data.users;
    },

    getPhotos(root, args, context) {
      return context.connectors.memory.data.photos;
    },
  },
};

export default resolvers;
