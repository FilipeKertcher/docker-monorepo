import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostORMEntity, UserORMEntity } from 'entities';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PostsResolver } from './posts.resolver';
const databaseEntities = [PostORMEntity, UserORMEntity];

@Module({
  controllers: [PostsController],
  imports: [HttpModule, TypeOrmModule.forFeature(databaseEntities)],
  providers: [PostsService, ConfigService, PostsResolver],
})
export class PostsModule {}
