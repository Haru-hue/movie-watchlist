import "graphql-import-node";
import * as typeDefs from "./schema.graphql";
import resolvers from "./resolver";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;