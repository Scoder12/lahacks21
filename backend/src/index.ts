import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { IFACE, PORT } from "./config";
import { __PROD__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello, world!");
});

async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    tracing: !__PROD__,
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, IFACE, () => {
    console.log(`Server listening at http://${IFACE}:${PORT}`);
  });
}

if (require.main === module) main();
