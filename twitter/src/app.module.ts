import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { CommentsModule } from './comments/comments.module';
import { ResponseController } from './response/response.controller';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [PrismaModule, UserModule, TweetsModule, AuthModule, FollowModule, CommentsModule, ResponseModule],
})
export class AppModule {}
