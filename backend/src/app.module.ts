import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostORMEntity, UserORMEntity } from 'entities';
import ormConfig from 'ormconfig';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
    }),
    TypeOrmModule.forFeature([PostORMEntity, UserORMEntity]),
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService, ConfigService],
})
export class AppModule {}
