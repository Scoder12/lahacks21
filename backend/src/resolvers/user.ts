import argon2 from "argon2";
import normalizeEmail from "normalize-email";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { User } from "../entities/User";
import { ResolverContext } from "../types/context";
import { RegistrationInput } from "../types/RegistrationInput";
import { validateRegistration } from "../utils/validateRegistration";

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
  async me(@Ctx() { req }: ResolverContext): Promise<User | undefined> {
    if (!req.session.userId) {
      // Not logged in
      return undefined;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options")
    { email, username, password }: RegistrationInput,
    @Ctx() { req }: ResolverContext
  ): Promise<UserResponse> {
    const errors = validateRegistration({ email, username, password });

    if (errors.length) return { errors };

    // Don't allow people with gmail addresses to make infinite accounts
    const normalizedEmail = normalizeEmail(email);

    const hashedPassword = await argon2.hash(password, argon2Config);
    let user: User;
    try {
      user = await User.create({
        email: normalizedEmail,
        username,
        password: hashedPassword,
      }).save();
    } catch (e) {
      // Check for "unique_violation" error
      if (e && e.code === "23505") {
        if (e.constraint === "user_email_unique") {
          return {
            errors: [
              {
                field: "email",
                message: "Email is already taken",
              },
            ],
          };
        } else if (e.constraint === "user_username_unique") {
          return {
            errors: [
              {
                field: "username",
                message: "Username is already taken",
              },
            ],
          };
        }
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
    @Ctx() { req }: ResolverContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where:
        // Emails must have an @ and usernames must not according to validation logic
        usernameOrEmail.includes("@")
          ? { email: normalizeEmail(usernameOrEmail) }
          : { username: usernameOrEmail },
    });

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
