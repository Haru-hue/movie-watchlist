import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );