import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";
import { ResolverContext } from "../types/context";

export const isAdmin: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  const user = await User.findOneOrFail(context.req.session.userId);
  if (!user.isAdmin) {
    throw new Error("You must be an admin to perform this action.");
  }

  return next();
};
