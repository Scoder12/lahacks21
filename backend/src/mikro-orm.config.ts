import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { DB } from "./config";
import { __PROD__ } from "./constants";
import { User } from "./entities/User";

export const MIKRO_CONFIG: Parameters<typeof MikroORM.init>[0] = {
  type: "postgresql",
  host: DB.HOST,
  port: DB.PORT,
  dbName: DB.NAME,
  user: DB.USER,
  password: DB.PWD,
  debug: !__PROD__,
  entities: [User],
  migrations: {
    path: path.join(__dirname, "migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
};
export default MIKRO_CONFIG;
