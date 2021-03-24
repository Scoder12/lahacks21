import { ResolverContext } from "src/types/context";
import { MiddlewareFn } from "type-graphql";

export const authed: MiddlewareFn<ResolverContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }
  return next();
};
