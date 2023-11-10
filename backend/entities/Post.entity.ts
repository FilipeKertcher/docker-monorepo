import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserORMEntity } from './User.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'posts' })
@ObjectType()
@InputType('PostEntity')
export class PostORMEntity {
  @Field(() => Number, { nullable: false })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String, {})
  @Column()
  title: string;

  @Field(() => String, {})
  @Column()
  body: string;

  @Field(() => String, {})
  @Column()
  image: string;

  @ManyToOne(() => UserORMEntity, (user: UserORMEntity) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Field(() => UserORMEntity, { nullable: true })
  user: Relation<UserORMEntity>;
}
