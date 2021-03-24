import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../entities/Category";
import { authed } from "../middlewares/authed";
import { isAdmin } from "../middlewares/isAdmin";

@Resolver()
export class CategoryResolver {
  @Mutation(() => Category)
  @UseMiddleware(authed)
  @UseMiddleware(isAdmin)
  adminCreateCategory(@Arg("name") name: string): Promise<Category> {
    if (!name) throw new Error("Invalid name!");
    return Category.create({ name }).save();
  }

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return Category.find({});
  }

  @Query(() => Category, { nullable: true })
  categoryById(@Arg("id") id: number): Promise<Category | undefined> {
    return Category.findOne(id);
  }
}
