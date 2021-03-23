import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import express from "express";
import { Session, SessionData } from "express-session";

export interface ResolverContext {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: express.Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: express.Response;
}
