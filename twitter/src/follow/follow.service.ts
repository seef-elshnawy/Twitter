import { ForbiddenException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { followInf } from './dto';

@Injectable()
export class FollowService {
    constructor(private prisma:PrismaService){}

   async addFollow(uid:number,dto:followInf){
   const followerId =parseInt(dto.followerId)
   if(uid!==followerId){
    if(await this.prisma.follwers.findMany({
        where:{
            followingId:uid
        }
    }).then(s=>s.filter(a=>a.uid===followerId)[0])!==undefined){
        return new ForbiddenException(404,"can't add your self")

    }
    else{
    const follow=await this.prisma.follwers.create({
        data:{
            uid:followerId,
            followingId:uid
        }
    }).then(()=>this.prisma.followings.create({
        data:{
           uid,
           followerId 
        }
    }))
    return follow
}
}else{
    return new ForbiddenException(404,"can't add your self")
}
   } 
   async removeFollow(uid:number,dto:followInf){
    var error:number
    const id =parseInt(dto.id)   
    if(await this.prisma.follwers.findUnique({
        where:{
            id,
        },
        
    }).then(async (s)=>{
    if(s.followingId===uid){
        const follow=await this.prisma.follwers.delete({
            where:{
                id,           
            }
        }).then(()=>this.prisma.followings.delete({
            where:{
               id
            }
        }))
        return follow
    }else{
    error=new ForbiddenException("You haven't access to do that").getStatus()
    console.log(error)
     return error
    }
    })   
    ){
        if(error!=undefined){
            return new ForbiddenException(error)
        }else{
            return 'deleted succsess'
        }
     }
   }
   async getFollowers(userId:number){
   const followers=await this.prisma.follwers.findMany({
        where:{
            uid:userId
        }
    })
    return followers
   }
   async getFollowings(userId:number){
    const followers=await this.prisma.follwers.findMany({
         where:{
             followingId:userId
         }
     })
     return followers
    }
    async getThisFollow(userId:number,dto:followInf){
      const followerId=parseInt(dto.followerId)
      const follow=await this.prisma.followings.findMany({
        where:{
         uid:userId,
         followerId
        }
      })
      if(follow[0]!==undefined){
        return follow

      }else if(follow[0]==undefined){
        return "you didn't have any relation with this guy";
      }
    }
}
