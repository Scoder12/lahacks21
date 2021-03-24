import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  authorId!: number;

  @ManyToOne(() => User, (user) => user.projects)
  author!: User;

  @Field()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.projects)
  category!: Category;

  // CSV of tags
  @Field()
  @Column()
  tags: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
