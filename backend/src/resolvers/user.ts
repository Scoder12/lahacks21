import argon2 from "argon2";
import normalizeEmail from "normalize-email";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { User } from "../entities/User";
import { authed } from "../middlewares/authed";
import { isAdmin } from "../middlewares/isAdmin";
import { ResolverContext } from "../types/context";
import { FieldError } from "../types/FieldError";
import { RegistrationInput } from "../types/RegistrationInput";
import { hashPassword } from "../utils/hashPassword";
import { validateRegistration } from "../utils/validateRegistration";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class BioInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  school!: string;

  @Field()
  location!: string;

  @Field()
  bio!: string;

  @Field()
  link!: string;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() { id, email }: User, @Ctx() { req }: ResolverContext): string {
    // User is viewing their own email
    if (req.session.userId === id) {
      return email;
    }
    // User is trying to view another user's email
    return "";
  }

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

    const hashedPassword = await hashPassword(password);
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

  // This is necessary because we don't want users to know whether an arbitrary user is
  //  an admin but they can know if the current user is an admin
  @Query(() => Boolean)
  @UseMiddleware(authed)
  async isAdmin(@Ctx() { req }: ResolverContext): Promise<boolean> {
    const user = await User.findOneOrFail(req.session.userId);
    return user.isAdmin;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authed)
  @UseMiddleware(isAdmin)
  async changeAdminStatus(
    @Arg("userId") userId: number,
    @Arg("isAdmin") isAdmin: boolean
  ): Promise<boolean> {
    await User.update(userId, { isAdmin });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authed)
  async updateBio(
    @Arg("input")
    input: BioInput,
    @Ctx() { req }: ResolverContext
  ): Promise<boolean> {
    if (!req.session.userId) throw new Error("Invalid ID!");
    await User.update(req.session.userId, input);
    return true;
  }
}
