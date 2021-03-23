import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CONFIG, IFACE, PORT } from "./config";
import { COOKIE_NAME, __PROD__ } from "./constants";
import MIKRO_CONFIG from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { ResolverContext } from "./types/context";

async function main() {
  const orm = await MikroORM.init(MIKRO_CONFIG);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        // This is safe because the type error is only caused by the versions of
        //  @types/ioredis are different between the root and @types/connect-redis's
        //  node_modules. An ioredis instance is valid here.
        client: redis as any,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // CSRF
        secure: __PROD__, // Should cookie only work over HTTPS
      },
      secret: CONFIG.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
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
