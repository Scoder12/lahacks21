import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import {
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH,
  SNIPPET_LENGTH,
} from "../constants";
import { Project } from "../entities/Project";
import { authed } from "../middlewares/authed";
import { ResolverContext } from "../types/context";
import { FieldError } from "../types/FieldError";

@InputType()
export class ProjectInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  categoryId: number;
}

@ObjectType()
export class CreateProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  project?: Project;
}

@ObjectType()
export class SnippetResponse {
  @Field()
  content: string;

  @Field()
  isTrimmed: boolean;
}

@ObjectType()
export class PaginatedProjects {
  @Field(() => [Project])
  projects: Project[];

  @Field()
  hasMore: boolean;
}

@Resolver(Project)
export class ProjectResolver {
  @FieldResolver()
  snippet(@Root() root: Project): SnippetResponse {
    return {
      content: root.text.slice(0, SNIPPET_LENGTH),
      isTrimmed: root.text.length > SNIPPET_LENGTH,
    };
  }

  @Mutation(() => CreateProjectResponse)
  @UseMiddleware(authed)
  async createProject(
    @Arg("input") { title, text, categoryId }: ProjectInput,
    @Ctx() { req }: ResolverContext
  ): Promise<CreateProjectResponse> {
    if (title.length > MAX_TITLE_LENGTH) {
      return {
        errors: [
          {
            field: "title",
            message: `Title should be at most ${MAX_TITLE_LENGTH} characters`,
          },
        ],
      };
    }

    if (text.length > MAX_CONTENT_LENGTH) {
      return {
        errors: [
          {
            field: "title",
            message: `Title should be at most ${MAX_CONTENT_LENGTH} characters`,
          },
        ],
      };
    }

    return {
      project: await Project.create({
        title,
        text,
        categoryId, //category.id,
        authorId: req.session.userId,
      }).save(),
    };
  }

  @Query(() => PaginatedProjects)
  async projects(
    @Arg("category", () => Int, { nullable: true }) category: number | null,
    @Arg("limit") limit: number,
    // cursor is too big to be an Int, so accept a string and parseInt it
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedProjects> {
    // Cap limit at 50 so that entire database can't be fetched with a single query.
    const realLimit = Math.min(limit, 50);
    // +1 allows us to determine hasMore
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Project)
      .createQueryBuilder("p")
      .innerJoinAndSelect("p.author", "u", 'u.id = p."authorId"')
      // Returns newests projects
      .orderBy("p.createdAt", "DESC")
      // take is better than .limit() for pagination
      .take(realLimitPlusOne);

    if (category) {
      qb.where('"categoryId" = :category', { category });
    }

    if (cursor) {
      const cursorMs = parseInt(cursor);
      if (isNaN(cursorMs)) throw new Error("Cursor should be a number");
      qb.where('"createdAt" < :cursor', { cursor: new Date(cursorMs) });
    }

    const projects = await qb.getMany();
    return {
      projects: projects.slice(0, realLimit),
      hasMore: projects.length == realLimitPlusOne,
    };
  }
}
