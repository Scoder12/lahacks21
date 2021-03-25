import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
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

  @Field()
  tags: string;
}

@ObjectType()
export class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  project?: Project;
}

@Resolver()
export class ProjectResolver {
  @Mutation(() => ProjectResponse)
  @UseMiddleware(authed)
  async createProject(
    @Arg("input") { title, text, categoryId, tags }: ProjectInput,
    @Ctx() { req }: ResolverContext
  ): Promise<ProjectResponse> {
    if (!/^[a-zA-Z0-9.,]+$/g.test(tags))
      return {
        errors: [
          {
            field: "tags",
            message:
              "Tags should be a comma-separated list of alphanumeric tags",
          },
        ],
      };

    return {
      project: await Project.create({
        title,
        text,
        categoryId, //category.id,
        authorId: req.session.userId,
        tags,
      }).save(),
    };
  }

  @Query(() => [Project])
  projects(
    @Arg("limit") limit: number,
    // cursor is too big to be an Int, so accept a string and parseInt it
    @Arg("cursor", () => String, { nullable: true }) cursor: string
  ): Promise<Project[]> {
    // Cap limit at 50 so that entire database can't be fetched with a single query
    const realLimit = Math.min(limit, 50);
    const qb = getConnection()
      .getRepository(Project)
      .createQueryBuilder("p")
      // pgsql requires non-lowercase fields to be quoted
      // Returns newests projects
      .orderBy('"createdAt"', "DESC")
      // take is better than .limit() for pagination
      .take(realLimit);

    if (cursor) {
      const cursorMs = parseInt(cursor);
      if (isNaN(cursorMs)) throw new Error("Cursor should be a number");
      qb.where('"createdAt" < :cursor', { cursor: new Date(cursorMs) });
    }

    return qb.getMany();
  }
}
