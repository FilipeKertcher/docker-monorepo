import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PostORMEntity } from './Post.entity';

@Entity({ name: 'users' })
export class UserORMEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  apiId: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(() => PostORMEntity, (post) => post.user)
  posts: Relation<PostORMEntity[]>;
}
