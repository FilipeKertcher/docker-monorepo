import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { PostsService } from './posts.service';

@Injectable()
@Controller('posts')
export class PostsController {
  constructor(
    @Inject(PostsService)
    private service: PostsService,
  ) {}

  @Get('/')
  async fetchPosts() {
    return await this.service.fetchPosts();
  }
}
