import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CONFIG, DB } from "./config";
import { COOKIE_NAME, __PROD__ } from "./constants";
import { Category } from "./entities/Category";
import { Project } from "./entities/Project";
import { User } from "./entities/User";
import { CategoryResolver } from "./resolvers/category";
import { HelloResolver } from "./resolvers/hello";
import { ProjectResolver } from "./resolvers/project";
import { UserResolver } from "./resolvers/user";
import { ResolverContext } from "./types/context";
import { hashPassword } from "./utils/hashPassword";

async function main() {
  const conn = await createConnection({
    type: "postgres",
    host: DB.HOST,
    port: DB.PORT,
    database: DB.NAME,
    username: DB.USER,
    password: DB.PWD,
    entities: [User, Project, Category],
    synchronize: true,
    logging: !__PROD__,
  });
  if (CONFIG.ADMIN_PASSWORD) {
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      console.log("Creating admin user...");
      const newUser = await User.create({
        username: "admin",
        email: "admin@admin.com",
        password: await hashPassword(CONFIG.ADMIN_PASSWORD),
        isAdmin: true,
      }).save();
      console.log(`New admin user created with ID ${newUser.id}`);
    } else {
      console.log("Admin account already exists");
    }
  } else {
    console.log(
      "Not creating an admin account, set ADMIN_PASSWORD to create one."
    );
  }

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
    resolvers: [HelloResolver, UserResolver, ProjectResolver, CategoryResolver],
    dateScalarMode: "timestamp",
  });
  const apolloServer = new ApolloServer({
    schema,
    tracing: !__PROD__,
    context: ({ req, res }): ResolverContext => ({ conn, req, res }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: { origin: CONFIG.FRONTEND_URL, credentials: true },
  });

  app.listen(CONFIG.PORT, CONFIG.IFACE, () => {
    console.log(`Server listening at http://${CONFIG.IFACE}:${CONFIG.PORT}`);
  });
}

if (require.main === module) main();
