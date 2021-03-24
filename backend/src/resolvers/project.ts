import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Category } from "../entities/Category";
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

    const category = await Category.findOne(categoryId);
    if (!category)
      return { errors: [{ field: "category", message: "Unknown category" }] };

    return {
      project: await Project.create({
        title,
        text,
        category,
        categoryId: category.id,
        authorId: req.session.userId,
      }).save(),
    };
  }
}
