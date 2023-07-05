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

  private async loadPostsInDatabase(posts: Post[], users: User[]) {
    const mappedUsers = users.map(
      (user) =>
        ({
          name: user.name,
          apiId: user.id,
          username: user.username,
          email: user.email,
        } as Partial<UserORMEntity>),
    );

    const createdUsers = await this.usersRepository.save(mappedUsers);

    const mappedPosts = posts.map((post) => {
      const user = createdUsers.find((user) => user.apiId === post.userId);

      return {
        ...post,
        user,
      } as Partial<PostORMEntity>;
    });

    await this.postsRepository.save(mappedPosts);
  }

  private async fetchPostsFromAPI() {
    const { data: posts } = await this.httpService.axiosRef.get<Post[]>(
      `${this.API_BASE_URL}/test-posts`,
    );

    const { data: users } = await this.httpService.axiosRef.get<User[]>(
      `${this.API_BASE_URL}/test-users`,
    );

    this.loadPostsInDatabase(posts, users);
    const mappedPosts = posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return {
        ...post,
        authorName: user?.name,
      };
    });

    return mappedPosts as Post[];
  }

  private async fetchFromDatabase() {
    const posts = await this.postsRepository.find({
      relations: {
        user: true,
      },
    });

    const mapped = posts.map((post) => ({
      userId: post.user.id,
      id: post.id,
      title: post.title,
      body: post.body,
      image: post.image,
      authorName: post.user.name,
    }));

    return mapped as Post[];
  }

  async fetchPosts() {
    const databasePosts = await this.fetchFromDatabase();

    if (databasePosts.length > 0) return databasePosts;

    const apiPosts = await this.fetchPostsFromAPI();

    return apiPosts;
  }
}
