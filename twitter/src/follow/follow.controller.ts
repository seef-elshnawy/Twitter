import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowService } from './follow.service';
import { GetUser } from 'src/auth/decorator';
import { followInf } from './dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('follow')
export class FollowController {
    constructor(private follows:FollowService){}
    @Post('add')
    addFollow(@GetUser('id') uid:number,@Body() dto:followInf){
   return this.follows.addFollow(uid,dto)
    }
    @Delete('remove')
    removeFollow(@GetUser('id') uid:number,@Body() dto:followInf){
   return this.follows.removeFollow(uid,dto)
    }
    @Get('followers')
    getFollowers(@GetUser('id') userId:number){
        return this.follows.getFollowers(userId)
    }
    @Get('followings')
    getFollowings(@GetUser('id') userId:number){
        return this.follows.getFollowings(userId)
    }
    @Get('information')
    getThisFollow(@GetUser('id') userId:number,@Body() dto:followInf){
        return this.follows.getThisFollow(userId,dto)
    }
}
