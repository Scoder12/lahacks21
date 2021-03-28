import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // BIO
  @Field()
  @Column({ default: "" })
  firstName!: string;

  @Field()
  @Column({ default: "" })
  lastName!: string;

  @Field()
  @Column({ default: "" })
  school!: string;

  @Field()
  @Column({ default: "" })
  location!: string;

  @Field()
  @Column({ default: "" })
  bio!: string;

  @Field()
  @Column({ default: "" })
  link!: string;

  // END BIO

  @Column({ default: false })
  isAdmin!: boolean;

  @Field(() => [Project])
  @OneToMany(() => Project, (project) => project.author)
  projects!: Project[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
