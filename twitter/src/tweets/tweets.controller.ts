import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { GetUser } from 'src/auth/decorator';
import { AddTweet, EditTweet, getTweet } from './dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('tweets')
export class TweetsController {
    constructor(private tweets:TweetsService){}
   @Get('get')
   getTweets(){
     return this.tweets.getTweets()
   } 
   @Get('get/mine')
   getMyTweets(@GetUser('id') userId:number){
     return this.tweets.getMyTweets(userId)
   } 
   @Get('get/tweet')
   getthisTweet(@Body() dto:getTweet){
     return this.tweets.getThisTweet(dto)
   }

  @Post('add')
  addTweet(@GetUser('id') userId:number, @Body() dto:AddTweet){
    return this.tweets.addTweet(userId,dto)
  }  
  @Patch('edit')
  editTweet(@GetUser('id') userId:number, @Body() dto:EditTweet){
    return this.tweets.editTweet(userId,dto)
  }
  
}
