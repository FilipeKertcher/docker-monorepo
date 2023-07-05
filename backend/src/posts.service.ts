import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Post } from './types/Post.type';
import { User } from './types/User.type';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PostORMEntity, UserORMEntity } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private configService: ConfigService,
    @InjectRepository(PostORMEntity)
    private postsRepository: Repository<PostORMEntity>,
    @InjectRepository(UserORMEntity)
    private usersRepository: Repository<UserORMEntity>,
  ) {}

  private API_BASE_URL = this.configService.get('SOURCE_HOST');

  async fetchPosts() {
    const { data: posts } = await this.httpService.axiosRef.get<Post[]>(
      `${this.API_BASE_URL}/test-posts`,
    );

    const { data: users } = await this.httpService.axiosRef.get<User[]>(
      `${this.API_BASE_URL}/test-users`,
    );

    const mappedPosts = posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return {
        ...post,
        authorName: user?.name,
      };
    });

    return mappedPosts;
  }
}
