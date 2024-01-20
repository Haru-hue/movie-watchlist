import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import schema from "./schema";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient()

const server = new ApolloServer({
  schema,
  context: {
    prisma
  },
});

(async () => {
  await server.start();
  app.use("*", cors());
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
  });
})();