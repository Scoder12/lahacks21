import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { IFACE, PORT } from "./config";
import { __PROD__ } from "./constants";
import MIKRO_CONFIG from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

async function main() {
  const orm = await MikroORM.init(MIKRO_CONFIG);
  await orm.getMigrator().up();

  const app = express();

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
