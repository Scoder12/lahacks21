import express from "express";
import { Session, SessionData } from "express-session";
import { Connection } from "typeorm";

export interface ResolverContext {
  conn: Connection;
  req: express.Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: express.Response;
}
