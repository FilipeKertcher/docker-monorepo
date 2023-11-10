import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PostORMEntity } from './Post.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('UserEntity')
@ObjectType()
@Entity({ name: 'users' })
export class UserORMEntity {
  @Field(() => String, { nullable: false })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String, {})
  @Column()
  apiId: number;

  @Field(() => String, {})
  @Column()
  name: string;

  @Field(() => String, {})
  @Column()
  username: string;

  @Field(() => String, {})
  @Column()
  email: string;

  @Field(() => PostORMEntity, { nullable: true })
  @OneToMany(() => PostORMEntity, (post) => post.user)
  posts: Relation<PostORMEntity[]>;
}
