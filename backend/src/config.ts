import envSchema from "env-schema";
import S from "fluent-json-schema";

export const schema = S.object()
  .prop("PORT", S.integer().required())
  .prop("IFACE", S.string());

export const CONFIG = envSchema({ schema }) as { PORT: number; IFACE?: string };
export const PORT = CONFIG.PORT;
export const IFACE = CONFIG.IFACE || "127.0.0.1";
