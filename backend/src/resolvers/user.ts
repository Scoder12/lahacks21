import argon2 from "argon2";
import normalizeEmail from "normalize-email";
import { COOKIE_NAME } from "src/constants";
import { User } from "src/entities/User";
import { ResolverContext } from "src/types/context";
import { RegistrationInput } from "src/types/RegistrationInput";
import { validateRegistration } from "src/utils/validateRegistration";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

// Benchmark time for 1 hash:
// ~1050ms on my 12 thread system
// ~1830ms on repl.it hacker plan
// ~3133ms on repl.it regular plan
// not sure where this will be hosted but seems pretty reasonable to me.
const argon2Config: argon2.Options & { raw: false } = {
  type: argon2.argon2id,
  memoryCost: 4096,
  parallelism: 1,
  timeCost: 512,
  raw: false,
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: ResolverContext): Promise<User | null> {
    if (!req.session.userId) {
      // Not logged in
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options")
    { email, username, password }: RegistrationInput,
    @Ctx() { em, req }: ResolverContext
  ): Promise<UserResponse> {
    const errors = validateRegistration({ email, username, password });

    if (errors.length) return { errors };

    // Don't allow people with gmail addresses to make infinite accounts
    const normalizedEmail = normalizeEmail(email);

    const hashedPassword = await argon2.hash(password, argon2Config);
    const user = await em.create(User, {
      email: normalizedEmail,
      username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (e) {
      // Check for "unique_violation" error
      if (e && e.code === "23505") {
        // Username is the only unique field
        return {
          errors: [
            {
              field: "username",
              message: "Username is already taken",
            },
          ],
        };
      }
      // Don't swallow real errors
      throw e;
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: ResolverContext
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      // Emails must have an @ and usernames must not according to validation logic
      usernameOrEmail.includes("@")
        ? { email: normalizeEmail(usernameOrEmail) }
        : { username: usernameOrEmail }
    );

    const badCredsError = {
      field: "usernameOrEmail",
      message: "Those credentials do not match",
    };
    if (!user) {
      return {
        errors: [badCredsError],
      };
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        errors: [badCredsError],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ResolverContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
        }
        resolve(true);
      })
    );
  }
}