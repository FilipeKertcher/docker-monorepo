import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserORMEntity } from './User.entity';

@Entity({ name: 'posts' })
export class PostORMEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @ManyToOne(() => UserORMEntity, (user: UserORMEntity) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserORMEntity>;
}
