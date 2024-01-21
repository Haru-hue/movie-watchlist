import {
  addUser,
  deleteUser,
  findUser,
  updateUser,
  verifyUser,
} from "../controllers";

const resolvers = {
  Query: {
    info: () => "Hello World",
    allUsers: async (_parent: any, _args: Args, context: Context) => {
      return await context.prisma.user.findMany();
    },
    user: async (_parent: any, args: Args, context: Context) => {
      return await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    },
    login: async (_parent: any, args: Args, context: Context) =>
      findUser(args, context),
  },
  User: {
    id: (parent: { id: number }) => parent.id,
    name: (parent: { name: string }) => parent.name,
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
    verifyUser: async (_parent: any, args: Args, context: Context) =>
      verifyUser(args, context),
  },
};

export default resolvers;
