import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PostORMEntity } from 'entities';
import { PostsService } from './posts.service';

@Resolver(() => PostORMEntity)
export class PostsResolver {
  constructor(
    @Inject(PostsService)
    private postsService: PostsService,
  ) {}

  @Query(() => [PostORMEntity])
  async fetchPosts(): Promise<PostORMEntity[]> {
    return await this.postsService.test();
  }
}
