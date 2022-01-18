import express from "express";
import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { PrismaClient } from "./generated/client";
import { HelloResolver } from "./graphql/resolvers";
import { ApolloServer } from "apollo-server-express";
import UserService from "./services/User";

const prisma = new PrismaClient();
UserService.prisma = prisma;

const bootstrap = async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Hello world");
  });

  app.get("/users", async (_, res) => {
    const users = await UserService.allUsers();
    res.send({ users });
  });

  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000");
  });
};

bootstrap()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
