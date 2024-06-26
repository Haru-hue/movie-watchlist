import {
  addUser,
  deleteUser,
  findUser,
  googleFindUser,
  updateUser,
} from "../controllers";

const resolvers = {
  Query: {
    info: () => "Hello World",
    allUsers: async (_parent: any, _args: Args, context: Context) => {
      return await context.prisma.user.findMany();
    },
    user: async (_parent: any, args: Args, context: Context) => {
      return await context.prisma.user.findUnique({
        where: { email: args.email },
      });
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: Args, context: Context, _info: any) =>
      addUser(args, context),
    updateUser: async (
      _parent: any,
      args: Args,
      context: Context,
      _info: any
    ) => updateUser(args, context),
    deleteUser: async (_parent: any, args: { id: any }, context: any) =>
      deleteUser(args, context),
    login: async (_parent: any, args: Args, context: Context) =>
      findUser(args, context),
    findUser: async (_parent: any, args: Args, context: Context) =>
      googleFindUser(args, context),
  },
};

export default resolvers;