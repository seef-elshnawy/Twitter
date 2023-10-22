import { Injectable } from '@nestjs/common';
import { AddTweet, EditTweet, getTweet } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'path';

@Injectable()
export class TweetsService {
    constructor(private prisma:PrismaService){}
async addTweet(userId:number,dto:AddTweet){
   
const tweet=await this.prisma.tweets.create({
  data:{
    userId,
    post_text:dto.post,
  }
})
return tweet
}

async editTweet(userId:number,dto:EditTweet){
    const id=dto.tweetId
const edit=await this.prisma.tweets.update({
    where:{
     id:parseInt(id)
    },
    data:{
       userId,
       post_text:dto.post,
    }
})
return edit
}
async getTweets(){
   const Tweets =await this.prisma.tweets.findMany({
    include:{
      user:true,
      comments:true,
      responses:true,
    }
   })
   return Tweets

}
async getThisTweet(dto:getTweet){
  const tweetId=parseInt(dto.tweetId)
  const tweet=await this.prisma.tweets.findMany({
  where:{
    id:tweetId,
  },
  include:{
    responses:true
  }
})
return tweet
}
async getMyTweets(userId:number){
  const tweets=await this.prisma.tweets.findMany({
    where:{
      userId
    },
    include:{
      user:true,
      comments:true,
      responses:true,
    }
  })
  return tweets
}
}


