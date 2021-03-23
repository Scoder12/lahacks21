import envSchema from "env-schema";
import S from "fluent-json-schema";

export const schema = S.object()
  .prop("PORT", S.integer().default(8080))
  .prop("IFACE", S.string().default("127.0.0.1"))
  .prop("DB_HOST", S.string().default("127.0.0.1"))
  .prop("DB_PORT", S.integer().default(5432))
  .prop("DB_NAME", S.string().default("postgres"))
  .prop("DB_USER", S.string().default("postgres"))
  .prop("DB_PWD", S.string().default(""));

export const CONFIG = envSchema({ schema }) as {
  PORT: number;
  IFACE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PWD: string;
};
export const PORT = CONFIG.PORT;
export const IFACE = CONFIG.IFACE;
export const DB = {
  HOST: CONFIG.DB_HOST,
  PORT: CONFIG.DB_PORT,
  NAME: CONFIG.DB_NAME,
  USER: CONFIG.DB_USER,
  PWD: CONFIG.DB_PWD,
};
