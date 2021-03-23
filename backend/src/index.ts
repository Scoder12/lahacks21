import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { IFACE, PORT } from "./config";
import { __PROD__ } from "./constants";
import MIKRO_CONFIG from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { ResolverContext } from "./types/context";

async function main() {
  const orm = await MikroORM.init(MIKRO_CONFIG);
  await orm.getMigrator().up();

  const app = express();
  app.use(session());

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    tracing: !__PROD__,
    context: ({ req, res }): ResolverContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, IFACE, () => {
    console.log(`Server listening at http://${IFACE}:${PORT}`);
  });
}

if (require.main === module) main();
