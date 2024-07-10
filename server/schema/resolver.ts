import { GraphQLResolveInfo } from "graphql";
import {
  addUser,
  deleteUser,
  findUser,
  googleFindUser,
  toggleWatchlist,
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
    addUser: async (_parent: User, args: Args, context: Context, _info: GraphQLResolveInfo) =>
      addUser(args, context),
    updateUser: async (
      args: Args,
      context: Context,
    ) => updateUser(args, context),
    login: async (_parent: User, args: Args, context: Context, _info: GraphQLResolveInfo) =>
      findUser(args, context),
    findUser: async (_parent: User, args: Args, context: Context, _info: GraphQLResolveInfo) =>
      googleFindUser(args, context),
    updateWatchlist: async (_parent: User, args: Args, context: Context, _info: GraphQLResolveInfo) => toggleWatchlist(args, context)
  },
};

export default resolvers;